import crypto from 'crypto';

import { Request, Response, NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import Mail from 'nodemailer/lib/mailer';

import { ControllerInterface, InfoMessage, User } from '../types';
import { Logger, transporter } from '../utils';
import { asyncHandler } from '../middlewares';
import { UserModel } from '../models';
import { HttpException, NotAuthorizedException, NotFoundException } from '../exceptions';

const { APP_NAME, SMTP_USER, BCRYPT_SALT_ROUNDS } = process.env;

/**
 * Class representing the API-controller for the Auth middleware.
 * @class AuthController
 * @implements {ControllerInterface}
 */
class AuthController implements ControllerInterface {
  public router = Router();

  /**
   * Intializes Controller
   * @constructor
   */
  constructor() {
    this.initializeRoutes();
  }

  /**
   * Generate token for a given user.
   * @private
   * @param {User} user the token holder
   * @returns {string} generated token
   */
  private genToken = (user: User): string => {
    return jwt.sign(
      {
        iss: 'Industrivinduet',
        sub: {
          id: user._id,
          email: user.email,
          permissions: user.permissions,
          member: user.member,
        },
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1),
      },
      process.env.JWT_SECRET_KEY as string,
    );
  };

  /**
   * Initializes API routes
   * @private
   */
  private initializeRoutes() {
    this.router.post('/login', asyncHandler(this.login));
    this.router.post('/register', asyncHandler(this.register));
    this.router.post('/forgot', asyncHandler(this.forgot));
    this.router.post('/reset', asyncHandler(this.reset));
  }

  /**
   * POST - register a new User through the Auth middleware.
   * @private
   * @name POST/api/register
   * @memberof AuthController
   * @function
   * @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private register = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    await passport.authenticate('register', (err: any, user: User, info: InfoMessage) => {
      if (err) {
        Logger.log('Error', err);

        return next(new HttpException(400, err.message));
      }
      if (info !== undefined) {
        return next(new NotFoundException('Kunne ikke finne medlem registrert med denne e-mailen'));
      } else {
        req.logIn(user, async (err) => {
          const data = {
            email: req.body.email,
            permissions: req.body.permissions,
          };
          await UserModel.findOneAndUpdate(
            {
              email: data.email,
            },
            {
              permissions: data.permissions,
            },
            { returnOriginal: false, useFindAndModify: false },
          ).then((modifiedUser: User) => {
            Logger.debug('User created in database.');
            const token = this.genToken(modifiedUser);
            res.status(200).send({
              user: modifiedUser,
              token: token,
            });
          });
        });
      }
    })(req, res, next);
  };

  /**
   * POST - login a User through the Auth middleware.
   * @private
   * @name POST/api/login
   * @memberof AuthController
   * @function
   * @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private login = async (req: Request, res: Response, next: NextFunction) => {
    await passport.authenticate('login', (err: any, user: User, info: InfoMessage) => {
      if (err) {
        Logger.log('Error', err);

        return next(new HttpException(500, err.message));
      }
      if (info !== undefined) {
        Logger.debug(info.message);

        return next(new NotAuthorizedException('Ugyldig e-mail og/eller passord'));
      } else {
        req.logIn(user, (err) => {
          UserModel.findOne({ email: user.email }).then((user: User) => {
            const token = this.genToken(user);
            res.status(200).send({
              user: user,
              token: token,
            });
          });
        });
      }
    })(req, res, next);
  };

  /**
   * POST - Generate a reset password token and send a reset mail to the requested user
   * @private
   * @name POST/api/forgot
   * @memberof AuthController
   * @function
   * @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private forgot = async (req: Request, res: Response, next: NextFunction) => {
    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 3600000; // 1 hour
    const user: User = await UserModel.findOneAndUpdate(
      { email: req.body.email },
      { resetPasswordToken: token, resetPasswordExpires: expires },
      { new: true },
      (err, doc) => {
        if (err) {
          return next(new HttpException(500, err.message));
        }

        if (!doc) {
          return next(
            new NotFoundException('Kunne ikke finne registert bruker med denne e-mailen'),
          );
        }
      },
    );

    const mailOptions: Mail.Options = {
      to: user.email,
      from: SMTP_USER,
      subject: `${APP_NAME} tilbakestill passord`,
      text:
        'Tilbakestill passordet ditt ved å trykke på, eller kopiere følgende lenke inn i nettleseren: \n\n' +
        `${req.headers.origin}/tilbakestill/${token} \n\n` +
        'Hvis du ikke etterspurte tilbakestilling av passordet ditt kan du ignorere denne lenken. \n',
    };
    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        return next(new HttpException(500, err.message));
      }
      Logger.debug('Mail sent');
      res.status(200).send({
        status: 'success',
        message: `En mail er sendt til ${user.email} med instruksjoner for tilbakestilling av passordet ditt.`,
      });
    });
  };

  /**
   * POST - Reset user password
   * @private
   * @name POST/api/reset
   * @memberof AuthController
   * @function
   * @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private reset = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = await UserModel.findOne({
      resetPasswordToken: req.body.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    // Return error if token is expired
    if (!user) {
      return next(new HttpException(400, 'Lenken har utløpt'));
    }

    const { password, confirmPassword } = req.body;

    if (!password || password !== confirmPassword) {
      return next(new HttpException(400, 'Ugyldig passord'));
    }

    // Update user password
    bcrypt.hash(password, parseInt(BCRYPT_SALT_ROUNDS as string)).then((hashedPassword) => {
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.save();
      res.status(200).send({ status: 'success', message: 'Passord oppdatert!' });
    });
  };
}

export default AuthController;

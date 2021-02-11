import { Request, Response, NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import { ControllerInterface, InfoMessage, User } from '../types';
import { Logger } from '../utils';
import { asyncHandler } from '../middlewares';
import { UserModel } from '../models';

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
  }

  /**
   * POST - register a new User through the Auth middleware.
   * @private
   * @name POST/auth/register
   * @memberof AuthController
   * @function
   * @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private register = async (req: Request, res: Response, next: NextFunction) => {
    await passport.authenticate('register', (err: any, user: User, info: InfoMessage) => {
      if (err) {
        Logger.log('Error', err);
      }
      if (info !== undefined) {
        res.send(info.message);
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
   * @name POST/auth/login
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
      }
      if (info !== undefined) {
        Logger.debug(info.message);
        res.send(info.message);
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
}

export default AuthController;

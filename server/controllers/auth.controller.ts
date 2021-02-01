import { Request, Response, NextFunction, Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import { asyncHandler } from '../middlewares';
import { ControllerInterface } from '../types';
import { User, UserModel } from '../models';

interface InfoMessage {
  message: string;
}

/**
 * Class representing the API-controller for the Auth middleware.
 * @class
 * @namespace AuthController
 */
class AuthController implements ControllerInterface {
  public path = '/auth';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private genToken = (user: User) => {
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

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, asyncHandler(this.login));
    this.router.post(`${this.path}/register`, asyncHandler(this.register));
  }

  /**
   * POST - register a new User through the Auth middleware.
   * @name POST/auth/register
   * @memberof AuthController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private register = async (req: Request, res: Response, next: NextFunction) => {
    await passport.authenticate('register', (err: any, user: User, info: InfoMessage) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
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
            console.log('User created in database.');
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
   * @name POST/auth/login
   * @memberof AuthController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private login = async (req: Request, res: Response, next: NextFunction) => {
    await passport.authenticate('login', (err: any, user: User, info: InfoMessage) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, (err) => {
          console.log(user.email);
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

import crypto from 'crypto';

import { Request, Response, NextFunction, Router } from 'express';
import { CallbackError } from 'mongoose';
import Mail from 'nodemailer/lib/mailer';

import { ControllerInterface, User } from '../types';
import { Logger, transporter } from '../utils';
import { asyncHandler, passport } from '../middlewares';
import { HttpException, NotFoundException } from '../exceptions';
import { UserModel } from '../models';

const { APP_NAME, SMTP_USER } = process.env;

/**
 * Class representing the API-controller for Users.
 * @class UserController
 * @implements {ControllerInterface}
 */
class UserController implements ControllerInterface {
  public path = '/users';
  public router = Router();

  /**
   * Intializes Controller
   * @constructor
   */
  constructor() {
    this.initializeRoutes();
  }

  /**
   * Initializes API routes
   * @private
   */
  private initializeRoutes() {
    this.router.get(
      this.path,
      passport.authenticate('jwt-admin', { session: false }),
      asyncHandler(this.getAll),
    );
    this.router.get(
      `${this.path}/:id`,
      passport.authenticate('jwt-admin', { session: false }),
      asyncHandler(this.get),
    );
    this.router.post(
      this.path,
      passport.authenticate('jwt-admin', { session: false }),
      asyncHandler(this.create),
    );
    this.router.put(
      `${this.path}/:id`,
      passport.authenticate('jwt-admin', { session: false }),
      asyncHandler(this.update),
    );
    this.router.delete(
      `${this.path}/:id`,
      passport.authenticate('jwt-admin', { session: false }),
      asyncHandler(this.delete),
    );
    this.router.post(`${this.path}/lookup`, asyncHandler(this.lookupToken));
  }

  /**
   * GET all documents from a the User collection. The request will
   * respond with a '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok' and return the documents.
   *
   * @private
   * @name GET/api/users
   * @memberof UserController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    await UserModel.find({}, { password: 0 }, {}, (err: CallbackError, docs: User[]) => {
      if (err) {
        return next(new HttpException(500, err.message));
      }
      res.status(200).send(docs);
    });
  };

  /**
   * GET a document by Id from the User collection. The request
   * will respond with a '404 Not Found' response if the User could not be found.
   * Else, respond with '200 Ok' and return the document.
   *
   * @private
   * @name GET/api/users/:id
   * @memberof UserController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private get = async (req: Request, res: Response, next: NextFunction) => {
    await UserModel.findById(req.params.id, { password: 0 }, {}, (err, doc) => {
      if (!doc) {
        return next(new NotFoundException(`Kunne ikke finne objekt med id ${req.params.id}`));
      }
      res.status(200).send(doc);
    });
  };

  /**
   * POST a new document to the User collection. The request will
   * respond with a '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok' and return the new document.
   *
   * @private
   * @name POST/api/users
   * @memberof UserController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private create = async (req: Request, res: Response, next: NextFunction) => {
    const { permissions, email } = req.body;
    if (!permissions || !email) {
      return next(new HttpException(400, 'Mangler brukerinformasjon'));
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = Date.now() + 3600000 * 24; // 24 hours

    const member = await UserModel.findMember(email);

    await new UserModel({
      email,
      permissions,
      member,
      registerToken: token,
      registerExpires: expires,
    }).save((err, doc) => {
      if (err) {
        return next(new HttpException(500, err.message));
      }

      const mailOptions: Mail.Options = {
        to: doc.email,
        from: SMTP_USER,
        subject: `${APP_NAME} registrer bruker`,
        text:
          'Registrer brukeren din ved å trykke på, eller kopiere følgende lenke inn i nettleseren: \n\n' +
          `${req.headers.origin}/registrer/${token} \n\n`,
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          return next(new HttpException(500, err.message));
        }
        Logger.debug('Mail sent');
        res.status(200).send({
          status: 'success',
          message: `En mail er sendt til ${doc.email} med instruksjoner for registrering/verifisering.`,
        });
      });

      res.status(200).send(doc);
    });
  };

  /**
   * PUT a document to the User collection. The request
   * will respond with a '404 Not Found' response if the User could not be found.
   * Else, respond with '200 Ok' and return the new document.
   *
   * @private
   * @name PUT/api/users/:id
   * @memberof UserController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private update = async (req: Request, res: Response, next: NextFunction) => {
    await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, doc) => {
      if (!doc) {
        return next(new NotFoundException(`Kunne ikke finne objekt med id ${req.params.id}`));
      }
      res.status(200).send(doc);
    });
  };

  /**
   * DELETE a document from the User collection. The request will
   * respond with a '404 Not Found' response if the User could not be found,
   * or '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok'.
   *
   * @private
   * @name DELETE/api/users
   * @memberof UserController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private delete = async (req: Request, res: Response, next: NextFunction) => {
    await UserModel.findById({ _id: req.params.id }, {}, {}, (err, doc) => {
      if (!doc) {
        return next(new NotFoundException(`Kunne ikke finne objekt med id ${req.params.id}`));
      }
      doc.remove({}, (err) => {
        if (err) {
          return next(new HttpException(500, err.message));
        }
        res.status(200).send({ status: 'success', message: 'Objekt slettet!' });
      });
    });
  };

  /**
   * POST - lookup a register token and verify that it's still active
   * @private
   * @name POST/api/users/lookup
   * @memberof UserController
   * @function
   * @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private lookupToken = async (req: Request, res: Response, next: NextFunction) => {
    const user: User = await UserModel.findOne({
      registerToken: req.body.token,
      registerExpires: { $gt: Date.now() },
    });

    // Return error if token is expired
    if (!user) {
      return next(new HttpException(400, 'Lenken har utløpt'));
    }

    res.status(200).send(user);
  };
}

export default UserController;

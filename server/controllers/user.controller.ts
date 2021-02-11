import { Request, Response, NextFunction, Router } from 'express';
import { CallbackError } from 'mongoose';

import { ControllerInterface, User } from '../types';
import { asyncHandler, passport } from '../middlewares';
import { HttpException, NotFoundException } from '../exceptions';
import { UserModel } from '../models';

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
  }

  /**
   * GET all documents from a the User collection. The request will
   * respond with a '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok' and return the documents.
   *
   * @private
   * @name GET/api/users
   * @userof UserController
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
   * @userof UserController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private get = async (req: Request, res: Response, next: NextFunction) => {
    await UserModel.findById(req.params.id, { password: 0 }, {}, (err, doc) => {
      if (!doc) {
        return next(new NotFoundException('No User found with that ID'));
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
   * @userof UserController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private create = async (req: Request, res: Response, next: NextFunction) => {
    await new UserModel({
      ...req.body,
    }).save((err, doc) => {
      if (err) {
        return next(new HttpException(500, err.message));
      }
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
   * @userof UserController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private update = async (req: Request, res: Response, next: NextFunction) => {
    await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, doc) => {
      if (!doc) {
        return next(new NotFoundException('No User found with that ID'));
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
   * @userof UserController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private delete = async (req: Request, res: Response, next: NextFunction) => {
    await UserModel.findById({ _id: req.params.id }, {}, {}, (err, doc) => {
      if (!doc) {
        return next(new NotFoundException('No User found with that ID'));
      }
      doc.remove({}, (err) => {
        if (err) {
          return next(new HttpException(500, err.message));
        }
        res.status(200).send({ message: 'Successfully deleted User!' });
      });
    });
  };
}

export default UserController;

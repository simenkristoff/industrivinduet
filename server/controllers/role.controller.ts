import { Request, Response, NextFunction, Router } from 'express';
import { CallbackError } from 'mongoose';

import { asyncHandler, passport } from '../middlewares';
import { HttpException, NotFoundException } from '../exceptions';
import { ControllerInterface } from '../types';
import { RoleModel, Role } from '../models';

/**
 * Class representing the API-controller for Roles.
 * @class
 * @namespace RoleController
 */
class RoleController implements ControllerInterface {
  public path = '/api/roles';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, asyncHandler(this.getAll));
    this.router.get(`${this.path}/:id`, asyncHandler(this.get));
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
   * GET all documents from a the Role collection. The request will
   * respond with a '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok' and return the documents.
   *
   * @name GET/api/roles
   * @memberof RoleController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    await RoleModel.find({}, (err: CallbackError, docs: Role[]) => {
      if (err) {
        return next(new HttpException(500, err.message));
      }
      res.status(200).send(docs);
    });
  };

  /**
   * GET a document by Id from the Role collection. The request
   * will respond with a '404 Not Found' response if the Role could not be found.
   * Else, respond with '200 Ok' and return the document.
   *
   * @name GET/api/roles/:id
   * @memberof RoleController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private get = async (req: Request, res: Response, next: NextFunction) => {
    await RoleModel.findById(req.params.id, (err: CallbackError, doc: Role) => {
      if (!doc) {
        return next(new NotFoundException('No Role found with that ID'));
      }
      res.status(200).send(doc);
    });
  };

  /**
   * POST a new document to the Role collection. The request will
   * respond with a '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok' and return the new document.
   *
   * @name POST/api/roles
   * @memberof RoleController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private create = async (req: Request, res: Response, next: NextFunction) => {
    await new RoleModel({
      ...req.body,
    }).save((err, doc) => {
      if (err) {
        return next(new HttpException(500, err.message));
      }
      res.status(200).send(doc);
    });
  };

  /**
   * PUT a document to the Role collection. The request
   * will respond with a '404 Not Found' response if the Role could not be found.
   * Else, respond with '200 Ok' and return the new document.
   *
   * @name PUT/api/roles/:id
   * @memberof RoleController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private update = async (req: Request, res: Response, next: NextFunction) => {
    await RoleModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, doc) => {
      if (!doc) {
        return next(new NotFoundException('No Role found with that ID'));
      }
      res.status(200).send(doc);
    });
  };

  /**
   * DELETE a document from the Role collection. The request will
   * respond with a '404 Not Found' response if the Role could not be found,
   * or '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok'.
   *
   * @name DELETE/api/roles
   * @memberof RoleController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private delete = async (req: Request, res: Response, next: NextFunction) => {
    await RoleModel.findById({ _id: req.params.id }, {}, {}, (err, doc) => {
      if (!doc) {
        return next(new NotFoundException('No Role found with that ID'));
      }
      doc.remove({}, (err) => {
        if (err) {
          return next(new HttpException(500, err.message));
        }
        res.status(200).send({ message: 'Successfully deleted Role!' });
      });
    });
  };
}

export default RoleController;

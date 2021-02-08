import { Request, Response, NextFunction, Router } from 'express';
import { CallbackError } from 'mongoose';

import { asyncHandler, passport } from '../middlewares';
import { HttpException, NotFoundException } from '../exceptions';
import { ControllerInterface } from '../types';
import { OptionModel, Option } from '../models';

/**
 * Class representing the API-controller for Options.
 * @class
 * @namespace OptionController
 */
class OptionController implements ControllerInterface {
  public path = '/options';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, asyncHandler(this.getAll));
    this.router.put(
      this.path,
      passport.authenticate('jwt-admin', { session: false }),
      asyncHandler(this.update),
    );
    this.router.delete(
      this.path,
      passport.authenticate('jwt-admin', { session: false }),
      asyncHandler(this.delete),
    );
  }

  /**
   * GET all documents from a the Option collection. The request will
   * respond with a '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok' and return the documents.
   *
   * @name GET/api/options
   * @memberof OptionController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    await OptionModel.findOne({}, (err: CallbackError, docs: Option[]) => {
      if (err) {
        return next(new HttpException(500, err.message));
      }
      res.status(200).send(docs);
    });
  };

  /**
   * PUT a document to the Option collection. The request
   * will respond with a '404 Not Found' response if the Option could not be found.
   * Else, respond with '200 Ok' and return the new document.
   *
   * @name PUT/api/options
   * @memberof OptionController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private update = async (req: Request, res: Response, next: NextFunction) => {
    await OptionModel.findOneAndUpdate({}, req.body, { new: true }, (err, doc) => {
      console.log(doc);
      if (!doc) {
        return next(new NotFoundException('No Option document'));
      }
      res.status(200).send(doc);
    });
  };

  /**
   * DELETE a document from the Option collection and creates a new one. The request will
   * respond with a '404 Not Found' response if the Option could not be found,
   * or '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok'.
   *
   * @name DELETE/api/options
   * @memberof OptionController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private delete = async (req: Request, res: Response, next: NextFunction) => {
    await OptionModel.findOne({}, {}, {}, (err, doc) => {
      if (!doc) {
        return next(new NotFoundException('No Option document found'));
      }
      doc.remove({}, (err) => {
        if (err) {
          return next(new HttpException(500, err.message));
        }

        new OptionModel().save((err, doc) => {
          if (err) {
            return next(new HttpException(500, err.message));
          }

          res.status(200).send(doc);
        });
      });
    });
  };
}

export default OptionController;

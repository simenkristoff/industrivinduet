import { Request, Response, NextFunction, Router } from 'express';
import { CallbackError } from 'mongoose';

import { ControllerInterface, StudyField } from '../types';
import { asyncHandler, passport } from '../middlewares';
import { HttpException, NotFoundException } from '../exceptions';
import { StudyFieldModel } from '../models';

/**
 * Class representing the API-controller for StudyFields.
 * @class StudyFieldController
 * @implements {ControllerInterface}
 */
class StudyFieldController implements ControllerInterface {
  public path = '/studyfields';
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
   * GET all documents from a the StudyField collection. The request will
   * respond with a '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok' and return the documents.
   *
   * @private
   * @name GET/api/studyfields
   * @memberof StudyFieldController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    await StudyFieldModel.find({}, (err: CallbackError, docs: StudyField[]) => {
      if (err) {
        return next(new HttpException(500, err.message));
      }
      res.status(200).send(docs);
    });
  };

  /**
   * GET a document by Id from the StudyField collection. The request
   * will respond with a '404 Not Found' response if the StudyField could not be found.
   * Else, respond with '200 Ok' and return the document.
   *
   * @private
   * @name GET/api/studyfields/:id
   * @memberof StudyFieldController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private get = async (req: Request, res: Response, next: NextFunction) => {
    await StudyFieldModel.findById(req.params.id, (err: CallbackError, doc: StudyField) => {
      if (!doc) {
        return next(new NotFoundException(`Kunne ikke finne objekt med id ${req.params.id}`));
      }
      res.status(200).send(doc);
    });
  };

  /**
   * POST a new document to the StudyField collection. The request will
   * respond with a '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok' and return the new document.
   *
   * @private
   * @name POST/api/studyfields
   * @memberof StudyFieldController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private create = async (req: Request, res: Response, next: NextFunction) => {
    await new StudyFieldModel({
      ...req.body,
    }).save((err, doc) => {
      if (err) {
        return next(new HttpException(500, err.message));
      }
      res.status(200).send(doc);
    });
  };

  /**
   * PUT a document to the StudyField collection. The request
   * will respond with a '404 Not Found' response if the StudyField could not be found.
   * Else, respond with '200 Ok' and return the new document.
   *
   * @private
   * @name PUT/api/studyfields/:id
   * @memberof StudyFieldController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private update = async (req: Request, res: Response, next: NextFunction) => {
    await StudyFieldModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, doc) => {
      if (!doc) {
        return next(new NotFoundException(`Kunne ikke finne objekt med id ${req.params.id}`));
      }
      res.status(200).send(doc);
    });
  };

  /**
   * DELETE a document from the StudyField collection. The request will
   * respond with a '404 Not Found' response if the StudyField could not be found,
   * or '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok'.
   *
   * @private
   * @name DELETE/api/studyfields
   * @memberof StudyFieldController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private delete = async (req: Request, res: Response, next: NextFunction) => {
    await StudyFieldModel.findById({ _id: req.params.id }, {}, {}, (err, doc) => {
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
}

export default StudyFieldController;

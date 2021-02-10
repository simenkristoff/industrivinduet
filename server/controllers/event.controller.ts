import { Request, Response, NextFunction, Router } from 'express';
import { CallbackError } from 'mongoose';
import { ControllerInterface, Event } from '@server/types';
import { asyncHandler, passport } from '@server/middlewares';
import { HttpException, NotFoundException } from '@server/exceptions';
import { EventModel } from '@server/models';

/**
 * Class representing the API-controller for Events.
 * @class
 * @namespace EventController
 */
class EventController implements ControllerInterface {
  public path = '/events';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, asyncHandler(this.getAll));
    this.router.get(`${this.path}/active`, asyncHandler(this.getActive));
    this.router.get(`${this.path}/:id`, asyncHandler(this.get));
    this.router.post(
      this.path,
      passport.authenticate('jwt', { session: false }),
      asyncHandler(this.create),
    );
    this.router.put(
      `${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      asyncHandler(this.update),
    );
    this.router.delete(
      `${this.path}/:id`,
      passport.authenticate('jwt', { session: false }),
      asyncHandler(this.delete),
    );
  }

  /**
   * GET all documents from a the Event collection. The request will
   * respond with a '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok' and return the documents.
   *
   * @name GET/api/events
   * @memberof EventController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    await EventModel.find()
      .sort({ date: -1 })
      .exec((err: CallbackError, docs: Event[]) => {
        if (err) {
          return next(new HttpException(500, err.message));
        }
        res.status(200).send(docs);
      });
  };

  /**
   * GET all active documents from a the Event collection. The request will
   * respond with a '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok' and return the documents.
   *
   * @name GET/api/events/active
   * @memberof EventController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private getActive = async (req: Request, res: Response, next: NextFunction) => {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    await EventModel.find({ active: true })
      .sort({ date: 1 })
      .limit(limit as number)
      .exec((err: CallbackError, docs: Event[]) => {
        if (err) {
          return next(new HttpException(500, err.message));
        }
        res.status(200).send(docs);
      });
  };

  /**
   * GET a document by Id from the Event collection. The request
   * will respond with a '404 Not Found' response if the Event could not be found.
   * Else, respond with '200 Ok' and return the document.
   *
   * @name GET/api/events/:id
   * @memberof EventController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private get = async (req: Request, res: Response, next: NextFunction) => {
    await EventModel.findById(req.params.id, (err: CallbackError, doc: Event) => {
      if (!doc) {
        return next(new NotFoundException('No Event found with that ID'));
      }
      res.status(200).send(doc);
    });
  };

  /**
   * POST a new document to the Event collection. The request will
   * respond with a '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok' and return the new document.
   *
   * @name POST/api/events
   * @memberof EventController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private create = async (req: Request, res: Response, next: NextFunction) => {
    await new EventModel({
      ...req.body,
    }).save((err, doc) => {
      if (err) {
        return next(new HttpException(500, err.message));
      }
      res.status(200).send(doc);
    });
  };

  /**
   * PUT a document to the Event collection. The request
   * will respond with a '404 Not Found' response if the Event could not be found.
   * Else, respond with '200 Ok' and return the new document.
   *
   * @name PUT/api/events/:id
   * @memberof EventController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private update = async (req: Request, res: Response, next: NextFunction) => {
    await EventModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, doc) => {
      if (err) {
        console.log(err);
      }
      if (!doc) {
        return next(new NotFoundException('No Event found with that ID'));
      }
      res.status(200).send(doc);
    });
  };

  /**
   * DELETE a document from the Event collection. The request will
   * respond with a '404 Not Found' response if the Event could not be found,
   * or '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok'.
   *
   * @name DELETE/api/events
   * @memberof EventController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private delete = async (req: Request, res: Response, next: NextFunction) => {
    await EventModel.findById({ _id: req.params.id }, {}, {}, (err, doc) => {
      if (!doc) {
        return next(new NotFoundException('No Event found with that ID'));
      }
      doc.remove({}, (err) => {
        if (err) {
          return next(new HttpException(500, err.message));
        }
        res.status(200).send({ message: 'Successfully deleted Event!' });
      });
    });
  };
}

export default EventController;

import { Request, Response, NextFunction, Router } from 'express';
import { CallbackError } from 'mongoose';
import { ControllerInterface, Member } from '@server/types';
import { asyncHandler, passport } from '@server/middlewares';
import { HttpException, NotFoundException } from '@server/exceptions';
import { MemberModel } from '@server/models';

/**
 * Class representing the API-controller for Members.
 * @class
 * @namespace MemberController
 */
class MemberController implements ControllerInterface {
  public path = '/members';
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
   * GET all documents from a the Member collection. The request will
   * respond with a '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok' and return the documents.
   *
   * @name GET/api/members
   * @memberof MemberController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private getAll = async (req: Request, res: Response, next: NextFunction) => {
    await MemberModel.find({}, (err: CallbackError, docs: Member[]) => {
      if (err) {
        return next(new HttpException(500, err.message));
      }
      res.status(200).send(docs);
    });
  };

  /**
   * GET a document by Id from the Member collection. The request
   * will respond with a '404 Not Found' response if the Member could not be found.
   * Else, respond with '200 Ok' and return the document.
   *
   * @name GET/api/members/:id
   * @memberof MemberController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private get = async (req: Request, res: Response, next: NextFunction) => {
    await MemberModel.findById(req.params.id, (err: CallbackError, doc: Member) => {
      if (!doc) {
        return next(new NotFoundException('No Member found with that ID'));
      }
      res.status(200).send(doc);
    });
  };

  /**
   * POST a new document to the Member collection. The request will
   * respond with a '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok' and return the new document.
   *
   * @name POST/api/members
   * @memberof MemberController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private create = async (req: Request, res: Response, next: NextFunction) => {
    await new MemberModel({
      ...req.body,
    }).save((err, doc) => {
      if (err) {
        return next(new HttpException(500, err.message));
      }
      res.status(200).send(doc);
    });
  };

  /**
   * PUT a document to the Member collection. The request
   * will respond with a '404 Not Found' response if the Member could not be found.
   * Else, respond with '200 Ok' and return the new document.
   *
   * @name PUT/api/members/:id
   * @memberof MemberController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private update = async (req: Request, res: Response, next: NextFunction) => {
    await MemberModel.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, doc) => {
      if (!doc) {
        return next(new NotFoundException('No Member found with that ID'));
      }
      res.status(200).send(doc);
    });
  };

  /**
   * DELETE a document from the Member collection. The request will
   * respond with a '404 Not Found' response if the Member could not be found,
   * or '500 Internal Server Error' if an error occurs.
   * Else, respond with '200 Ok'.
   *
   * @name DELETE/api/members
   * @memberof MemberController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private delete = async (req: Request, res: Response, next: NextFunction) => {
    await MemberModel.findById({ _id: req.params.id }, {}, {}, (err, doc) => {
      if (!doc) {
        return next(new NotFoundException('No Member found with that ID'));
      }
      doc.remove({}, (err) => {
        if (err) {
          return next(new HttpException(500, err.message));
        }
        res.status(200).send({ message: 'Successfully deleted Member!' });
      });
    });
  };
}

export default MemberController;

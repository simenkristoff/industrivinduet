import fs from 'fs';

import _ from 'lodash';
import { Request, Response, NextFunction, Router } from 'express';

import { ControllerInterface, MediaTypeInterface } from '../types';
import { MediaUtils, TreeNode } from '../utils';
import { asyncHandler, passport, mediaMiddleware } from '../middlewares';
import { HttpException } from '../exceptions';

/**
 * Class representing the API-controller for handling Media Files.
 * @class MediaController
 * @implements {ControllerInterface}
 */
class MediaController implements ControllerInterface {
  public router = Router();
  private DIRECTORY = `./server/resources/static/assets${process.env.UPLOAD_DIR}/`;
  private STATIC_URL = `http://localhost:8080${process.env.UPLOADS_STATIC_FOLDER_PREFIX}/`;

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
    this.router.post(
      '/upload',
      passport.authenticate('jwt', { session: false }),
      asyncHandler(this.upload),
    );
    this.router.get(
      '/files',
      passport.authenticate('jwt', { session: false }),
      asyncHandler(this.getListFiles),
    );
    this.router.delete(
      '/files',
      passport.authenticate('jwt', { session: false }),
      asyncHandler(this.delete),
    );
    this.router.post(
      '/folders',
      passport.authenticate('jwt', { session: false }),
      asyncHandler(this.createFolder),
    );
    this.router.put(
      '/folders',
      passport.authenticate('jwt', { session: false }),
      asyncHandler(this.updateFolder),
    );
  }

  /**
   * POST media file to server and store it in disk storage
   *
   * @private
   * @name POST/api/upload
   * @memberof MediaController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private upload = async (req: Request, res: Response, next: NextFunction) => {
    await mediaMiddleware(req, res);
    if (!req.file) {
      return next(new HttpException(400, 'Ingen fil lastet opp'));
    }
    const fileNode: TreeNode = MediaUtils.parseFile(req.file, req.query.path as string);
    res.status(200).send(fileNode);
  };

  /**
   * GET returns a Tree structure object of all files in disk storage.
   *
   * @private
   * @name GET/api/upload
   * @memberof MediaController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private getListFiles = async (req: Request, res: Response, next: NextFunction) => {
    const url = this.STATIC_URL;
    const dir = MediaUtils.dirWalker(this.DIRECTORY);
    res.status(200).send(dir);
  };

  /**
   * DELETE deletes a file in disk storage.
   *
   * @private
   * @name DELETE/api/files
   * @memberof MediaController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private delete = async (req: Request, res: Response, next: NextFunction) => {
    const files: MediaTypeInterface[] = req.body.files;
    if (!files) {
      return next(new HttpException(400, 'Ingen filer å slette'));
    }

    _.forEach(files, (file) => {
      if (file.isDir) {
        fs.rmdirSync(this.DIRECTORY + file.path, { recursive: true });
      } else {
        fs.unlink(this.DIRECTORY + file.path, (err) => {
          if (err) {
            return next(new HttpException(400, `Kunne ikke slette filen med navn ${file.name}`));
          }
        });
      }
    });

    res.status(200).send({
      status: 'success',
      message: `Slettet ${files.length} filer`,
    });
  };

  /**
   * POST create a folder in disk storage.
   *
   * @private
   * @name POST/api/folders
   * @memberof MediaController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private createFolder = async (req: Request, res: Response, next: NextFunction) => {
    const folder: MediaTypeInterface = req.body;
    fs.mkdir(this.DIRECTORY + folder.path, (err) => {
      if (err) {
        return next(new HttpException(400, 'Kunne ikke opprette ny mappe'));
      }
      fs.chmodSync(this.DIRECTORY + folder.path, 0o777);
      res.status(200).send({
        status: 'success',
        message: `Ny mappe lagt til`,
      });
    });
  };

  /**
   * PUT rename a folder in disk storage.
   *
   * @private
   * @name PUT/api/folders
   * @memberof MediaController
   * @function @async
   *
   * @param {Request} req the request
   * @param {Response} res the response
   * @param {NextFunction} next the next function
   */
  private updateFolder = async (req: Request, res: Response, next: NextFunction) => {
    const folder: MediaTypeInterface = req.body;
    const newPaths = folder.path.split('/');
    newPaths.pop();
    newPaths.push(folder.name);
    if (!folder.isDir) {
      return next(new HttpException(400, 'Ingen mappe valgt'));
    }
    fs.rename(this.DIRECTORY + folder.path, this.DIRECTORY + newPaths.join('/'), (err) => {
      if (err) {
        console.log(err);

        return next(new HttpException(400, 'Oppdatering av mappen feilet'));
      }
      res.status(200).send({
        status: 'success',
        message: `Mappen er oppdatert`,
      });
    });
  };
}

export default MediaController;

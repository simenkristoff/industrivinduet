import fs, { Dir, stat } from 'fs';
import * as path from 'path';

import _ from 'lodash';
import dotenv from 'dotenv';
import { Request, Response, NextFunction, Router } from 'express';
import { CallbackError } from 'mongoose';

import { walker, Logger } from '../utils';
import { asyncHandler, passport, mediaMiddleware } from '../middlewares';
import { ControllerInterface } from '../types';
import { HttpException } from '../exceptions';

interface FileInstance {
  basename: string;
  dirname: string;
  extension: string;
  size: any;
  type: 'file' | 'dir';
}

interface FileEntry {
  name: string;
  parent: string;
  created: string;
  lastUpdated: string;
  lastAccessed: string;
}

class MediaController implements ControllerInterface {
  public path = '/api';
  public router = Router();
  private DIRECTORY = `./server/resources/static/assets${process.env.UPLOAD_DIR}/`;
  private STATIC_URL = `http://localhost:8080${process.env.UPLOADS_STATIC_FOLDER_PREFIX}/`;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/upload`,
      //passport.authenticate('jwt', { session: false }),
      asyncHandler(this.upload),
    );
    this.router.get(
      `${this.path}/files`,
      //passport.authenticate('jwt', { session: false }),
      asyncHandler(this.getListFiles),
    );
    this.router.delete(
      `${this.path}/files/:name`,
      //passport.authenticate('jwt', { session: false }),
      asyncHandler(this.delete),
    );
    this.router.get(
      `${this.path}/files/:name`,
      //passport.authenticate('jwt', { session: false }),
      asyncHandler(this.download),
    );
  }

  private upload = async (req: Request, res: Response, next: NextFunction) => {
    await mediaMiddleware(req, res);

    if (!req.file) {
      return next(new HttpException(400, 'No File uploaded'));
    }

    res.status(200).send({
      message: 'Successfully uploaded the file: ' + req.file.originalname,
    });
  };

  private getListFiles = async (req: Request, res: Response, next: NextFunction) => {
    const url = this.STATIC_URL;
    const test = await walker(this.DIRECTORY, (err, results) => {
      if (err) throw err;
      res.status(200).send(results);
    });
    console.log(test);
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    const fileName = req.params.name;
    await fs.unlink(this.DIRECTORY + fileName, (err) => {
      console.log(this.DIRECTORY + fileName);
      res.status(200).send({
        message: 'Successfully deleted the file: ' + fileName,
      });
    });
  };

  private download = async (req: Request, res: Response, next: NextFunction) => {
    const fileName = req.params.name;

    res.download(this.DIRECTORY + fileName, fileName, (err) => {
      if (err) {
        return next(new HttpException(500, 'Could not download the file. ' + err));
      }
    });
  };
}

export default MediaController;

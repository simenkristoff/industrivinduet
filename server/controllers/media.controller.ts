import fs from 'fs';

import _ from 'lodash';
import { Request, Response, NextFunction, Router } from 'express';

import { TreeNode } from '../utils/mediaUtils';
import { MediaUtils, Logger } from '../utils';
import { asyncHandler, passport, mediaMiddleware } from '../middlewares';
import { ControllerInterface, MediaTypeInterface } from '../types';
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
      `${this.path}/files`,
      //passport.authenticate('jwt', { session: false }),
      asyncHandler(this.delete),
    );
    this.router.post(
      `${this.path}/folders`,
      //passport.authenticate('jwt', { session: false }),
      asyncHandler(this.createFolder),
    );
    this.router.put(
      `${this.path}/folders`,
      //passport.authenticate('jwt', { session: false }),
      asyncHandler(this.updateFolder),
    );
  }

  private upload = async (req: Request, res: Response, next: NextFunction) => {
    await mediaMiddleware(req, res);
    if (!req.file) {
      return next(new HttpException(400, 'No File uploaded'));
    }
    const fileNode: TreeNode = MediaUtils.parseFile(req.file, req.query.path as string);
    res.status(200).send(fileNode);
  };

  private getListFiles = async (req: Request, res: Response, next: NextFunction) => {
    const url = this.STATIC_URL;
    const dir = MediaUtils.dirWalker(this.DIRECTORY);
    res.status(200).send(dir);
  };

  private delete = async (req: Request, res: Response, next: NextFunction) => {
    const files: MediaTypeInterface[] = req.body.files;
    if (!files) {
      return next(new HttpException(400, 'No Files to delete'));
    }

    await _.forEach(files, (file) => {
      if (file.isDir) {
        fs.rmdirSync(this.DIRECTORY + file.path, { recursive: true });
      } else {
        fs.unlink(this.DIRECTORY + file.path, (err) => {
          if (err) {
            return next(new HttpException(400, `Could not delete file ${file.name}`));
          }
        });
      }
    });

    res.status(200).send({
      message: `Successfully deleted ${files.length} files`,
    });
  };

  private createFolder = async (req: Request, res: Response, next: NextFunction) => {
    const folder: MediaTypeInterface = req.body;
    fs.mkdir(this.DIRECTORY + folder.path, (err) => {
      if (err) {
        return next(new HttpException(400, 'Could not create folder'));
      }
      fs.chmodSync(this.DIRECTORY + folder.path, 0o777);
      res.status(200).send({
        message: `Successfully created folder`,
      });
    });
  };

  private updateFolder = async (req: Request, res: Response, next: NextFunction) => {
    const folder: MediaTypeInterface = req.body;
    const newPaths = folder.path.split('/');
    newPaths.pop();
    newPaths.push(folder.name);
    if (!folder.isDir) {
      return next(new HttpException(400, 'No Folder to update'));
    }
    fs.rename(this.DIRECTORY + folder.path, this.DIRECTORY + newPaths.join('/'), (err) => {
      if (err) {
        console.log(err);

        return next(new HttpException(400, 'Failed to update folder'));
      }
      res.status(200).send({
        message: `Successfully updated folder`,
      });
    });
  };
}

export default MediaController;

import util from 'util';
import path from 'path';
import fs from 'fs';

import _ from 'lodash';
import multer from 'multer';

import { Logger } from '../utils';

const MAX_UPLOAD_SIZE = (process.env.MAX_UPLOAD_SIZE as unknown) as number;
const UPLOAD_DIR = process.env.UPLOAD_DIR;

/**
 * Setup Multer Disk Storage for media files
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './server/resources/static/assets' + UPLOAD_DIR;
    const path = req.query.path;
    var dest = path ? `${dir}/${path}` : dir;
    var stat = null;
    // If destination consists of non-existent sub-directories, create new ones.
    try {
      stat = fs.statSync(dest);
    } catch (err) {
      const pathPieces = (path as string).split('/');
      var pathBuilder = '';
      _.forEach(pathPieces, (_p) => {
        pathBuilder += '/' + _p;
        fs.mkdirSync(dir + pathBuilder);
        fs.chmodSync(dir + pathBuilder, 0o777);
      });
    }
    if (stat && !stat.isDirectory()) {
      throw new Error(
        'Directory cannot be created because an inode of a different type exists at "' + dest + '"',
      );
    }
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    Logger.debug(file.originalname);
    const filename = file.originalname.replace(/[\s@\-\=\+\?]/gm, '_');
    cb(null, filename);
  },
});

/**
 * Upload file to Disk Storage
 */
const uploadFile = multer({
  storage: storage,
  limits: { fileSize: MAX_UPLOAD_SIZE },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(null, false);
  },
}).single('image');

const mediaMiddleware = util.promisify(uploadFile);
export default mediaMiddleware;

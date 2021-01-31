import util from 'util';
import path from 'path';

import dotenv from 'dotenv';
import multer from 'multer';
import shortid from 'shortid';

import { Logger } from '../utils';

const MAX_UPLOAD_SIZE = (process.env.MAX_UPLOAD_SIZE as unknown) as number;
const UPLOAD_DIR = process.env.UPLOAD_DIR;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './server/resources/static/assets' + UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    Logger.debug(file.originalname);
    cb(null, file.originalname);
  },
});

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

import { Request, Response, NextFunction } from 'express';
import { Error as MongoError } from 'mongoose';

import { Logger } from '../utils';
import { HttpException } from '../exceptions';

/**
 * Handle Mongoose CastErrors
 * @param err
 */
const handleCastErrorDB = (err: MongoError.CastError) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new HttpException(400, message);
};

/**
 * Handle Mongoose DuplicateFieldsError
 * @param err error
 */
const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use anothe value!`;

  return new HttpException(400, message);
};

/**
 * Handle Mongoose DuplicateFieldsError
 * @param err error
 */
const handleValidationErrorDB = (err: MongoError.ValidationError) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;

  return new HttpException(400, message);
};

/**
 * Send error in development environment
 * @param err error
 * @param {Response} res the response
 */
const sendErrorDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

/**
 * Send error in production environment
 * @param err error
 * @param {Response} res the response
 */
const sendErrorProd = (err: any, res: Response) => {
  // Operational error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    Logger.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

/**
 * Handles runtime errors.
 * @param err error
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    sendErrorProd(err, res);
  }
}

export default errorMiddleware;

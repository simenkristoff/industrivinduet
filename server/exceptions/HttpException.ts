import { ExceptionInterface } from '../types';

export default class HttpException extends Error implements ExceptionInterface {
  public statusCode;
  public message;
  public isOperational;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

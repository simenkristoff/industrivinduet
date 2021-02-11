import { ExceptionInterface } from '../types';

/**
 * Class HttpException. The super class for custom runtime exceptions
 * @class HttpException
 */
export default class HttpException extends Error implements ExceptionInterface {
  public statusCode;
  public message;
  public isOperational;

  /**
   * Creates an instance of HttpException
   * @constructor
   * @param {number} statusCode response status
   * @param {string} message
   */
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

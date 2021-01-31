import { Router, Request, Response, NextFunction } from 'express';
import { Types, Document } from 'mongoose';

/* Async Request*/
export type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

/* HttpException */
export interface ExceptionInterface extends Error {
  statusCode: number;
  message: string;
  isOperational: boolean;
}

export interface MessageInterface {
  key: String;
  value: String;
  language: String;
  status: Number;
}

/**
 * Interface describes the basic Controller.
 * @interface
 */
export interface ControllerInterface {
  path: string;
  router: Router;
}

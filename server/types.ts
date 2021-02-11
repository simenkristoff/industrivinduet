import { Router, Request, Response, NextFunction } from 'express';

export * from './models/interface';

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
 * Interface describing a MediaFile
 * @interface
 */
export interface MediaTypeInterface {
  readonly path: string;
  readonly name: string;
  readonly isDir: boolean;
  readonly size: number;
  readonly ext?: string;
  readonly children: Array<MediaTypeInterface>;
}

/**
 * Interface describes the basic Controller.
 * @interface
 */
export interface ControllerInterface {
  path?: string;
  router: Router;
}

/**
 * Interface describing a info message from Passport
 * @interface
 */
export interface InfoMessage {
  message: string;
}

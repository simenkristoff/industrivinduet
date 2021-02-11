import { Request, Response, NextFunction } from 'express';

/**
 * Wraps an asynchronous requests in a try-catch.
 * @param fn request function
 */
const asyncHandler = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default asyncHandler;

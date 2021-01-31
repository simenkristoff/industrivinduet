import { Request, Response, NextFunction, RequestHandler } from 'express';

import { AsyncRequestHandler } from '../types';

// export default (handler: AsyncRequestHandler): RequestHandler => {
//   return (req, res, next) => {
//     return handler(req, res, next).catch(next);
//   };
// };

const asyncHandler = (fn: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default asyncHandler;

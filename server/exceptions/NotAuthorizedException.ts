import { Model, Document } from 'mongoose';

import HttpException from './HttpException';

class NotAuthorizedException extends HttpException {
  constructor(message: string | undefined = 'Not authorized.') {
    super(403, message);
  }
}

export default NotAuthorizedException;

import { Model, Document } from 'mongoose';

import HttpException from './HttpException';

class NotFoundException extends HttpException {
  constructor(message: string = 'Resource could not be found.') {
    super(404, message);
  }
}

export default NotFoundException;

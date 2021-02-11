import HttpException from './HttpException';

/**
 * Class NotFoundException. The class for Not Found exceptions
 * @class NotFoundException
 * @extends HttpException
 */
class NotFoundException extends HttpException {
  /**
   * Creates an instance of NotFoundException
   * @param {string} message the error message
   */
  constructor(message: string = 'Resource could not be found.') {
    super(404, message);
  }
}

export default NotFoundException;

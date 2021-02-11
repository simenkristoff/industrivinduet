import HttpException from './HttpException';

/**
 * Class NotAuthorizedException. The class for Unathorized exceptions
 * @class NotAuthorizedException
 * @extends HttpException
 */
class NotAuthorizedException extends HttpException {
  /**
   * Creates an instance of NotAuthorizedException
   * @param {string} message the error message
   */
  constructor(message: string | undefined = 'Not authorized.') {
    super(403, message);
  }
}

export default NotAuthorizedException;

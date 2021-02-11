import morgan from 'morgan';

const { Logger } = require('../utils');

/**
 * Setup logger streamer
 */
Logger.stream = {
  write: function (message: any, encoding: any) {
    Logger.info(message, encoding);
  },
};

/**
 * Setup logger middleware
 */
const loggerMiddleware = morgan(':method :url :status :response-time ms - :res[content-length]', {
  stream: Logger.stream,
});

export default loggerMiddleware;

import morgan from 'morgan';

const { Logger } = require('@server/utils');

Logger.stream = {
  write: function (message: any, encoding: any) {
    Logger.info(message, encoding);
  },
};

// const loggerMiddleware = morgan('dev', {
//   stream: Logger.stream,
// });

const loggerMiddleware = morgan(':method :url :status :response-time ms - :res[content-length]', {
  stream: Logger.stream,
});

export default loggerMiddleware;

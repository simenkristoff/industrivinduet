import fs from 'fs';
import path from 'path';

import { parseInt } from 'lodash';
import winston from 'winston';

const logDirectory = path.join(process.env.LOG_DIR_NAME as string);
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

//const path = process.env.SERVER_LOGS_PATH as string;

const Logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: process.env.LOG_FILE_NAME,
      dirname: logDirectory,
      handleExceptions: true,
      format: winston.format.combine(winston.format.json(), winston.format.colorize()),
      maxsize: parseInt(process.env.LOG_MAX_SIZE as string),
      maxFiles: parseInt(process.env.LOG_MAX_FILE as string),
    }),
    new winston.transports.Console({
      //name: 'error',
      level: 'error',
      handleExceptions: true,
      format: winston.format.colorize(),
    }),
    new winston.transports.Console({
      //name: 'error',
      level: 'debug',
      handleExceptions: true,
      format: winston.format.colorize(),
    }),
  ],
  exitOnError: false,
});

// const Logger = createLogger({
//   format: format.combine(
//     format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
//     format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
//   ),
//   transports: [
//     new transports.File({
//       filename: `${path}/all-logs.log`,
//       maxsize: 5242880,
//       maxFiles: 5,
//     }),
//     new transports.Console(),
//   ],
// });

export default Logger;

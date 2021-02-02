import path from 'path';

import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import { passport, logger, errorMiddleware, mediaMiddleware } from './middlewares';
import { ControllerInterface } from './types';
import { Logger } from './utils';
import { OptionModel } from './models';

dotenv.config({ path: path.resolve(__dirname, '.env') });

class App {
  public app: express.Application;
  private isProduction = process.env.NODE_ENV === 'production';

  constructor(controllers: ControllerInterface[]) {
    this.app = express();
    this.connect();
    this.initializeFileMiddleware();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initializeOptions();
  }

  public listen(): void {
    this.app.listen(process.env.SERVER_PORT, () => {
      Logger.debug(`Server running on port ${process.env.SERVER_PORT}`);
    });
  }

  public getServer(): express.Application {
    return this.app;
  }

  private initializeFileMiddleware() {
    this.app.use(mediaMiddleware);
    this.app.use(
      (process.env.UPLOADS_STATIC_FOLDER_PREFIX as unknown) as string,
      express.static('./server/resources/static/assets' + process.env.UPLOAD_DIR),
    );
    this.app.use('/resources', express.static('./resources'));
  }

  private initializeMiddlewares() {
    this.app.use(helmet()); // Sets HTTP headers that can defend agains xss attacks
    this.app.use(hpp()); // Protects against HTTP Parameter Pollution
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors({ origin: this.isProduction ? false : '*' }));
    this.app.use(passport.initialize());
    if (!this.isProduction) {
      this.app.use(logger);
    }
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: ControllerInterface[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
    this.app.get('/', (req, res) => {
      res.send('Invalid endpoint');
    });
  }

  private initializeOptions() {
    OptionModel.estimatedDocumentCount({}, (err, count) => {
      if (!err && count === 0) {
        new OptionModel().save((err) => {
          if (err) {
            Logger.debug('Error initializing options', err);
          }

          Logger.debug('Intialized options');
        });
      }
    });
  }

  private async connect() {
    const { DB_HOST, DB_PORT, DB_NAME } = process.env;
    try {
      mongoose.connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      Logger.debug('Connected to MongoDB');
    } catch (error) {
      Logger.error('Could not connect to MongoDB', error);
    }
  }
}

export default App;

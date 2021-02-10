import path from 'path';

import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import { passport, logger, errorMiddleware } from './middlewares';
import { ControllerInterface } from './types';
import { Logger } from './utils';
import { OptionModel, UserModel, UserPermissions } from './models';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS as string;

class App {
  public app: express.Application;
  private isProduction = process.env.NODE_ENV === 'production';

  constructor(controllers: ControllerInterface[]) {
    this.app = express();
    this.connect();
    this.initializeMediaStatics();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initializeRoot();
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

  private initializeMediaStatics() {
    this.app.use(
      '/media',
      express.static('./server/resources/static/assets' + process.env.UPLOAD_DIR),
    );
    this.app.use('/resources', express.static('./resources'));
  }

  private initializeMiddlewares() {
    this.app.set('trust proxy', 1);
    this.app.use(cors({ origin: this.isProduction ? false : '*' }));
    this.app.use(
      helmet({
        contentSecurityPolicy: false,
      }),
    ); // Sets HTTP headers that can defend agains xss attacks
    this.app.use(hpp()); // Protects against HTTP Parameter Pollution
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(passport.initialize());
    if (!this.isProduction) {
      this.app.use(logger);
    }
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: ControllerInterface[]) {
    this.app.use(express.static(path.join(__dirname, '../dist/')));
    controllers.forEach((controller) => {
      this.app.use('/api', controller.router);
    });
    this.app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
  }

  private initializeRoot() {
    UserModel.estimatedDocumentCount({}, (err, count) => {
      if (!err && count === 0) {
        const password = bcrypt.hashSync('iv_admin', parseInt(BCRYPT_SALT_ROUNDS));
        UserModel.create({
          email: 'admin@industrivinduet.no',
          password,
          permissions: UserPermissions.ADMIN,
          isRoot: true,
        })
          .then((user) => {
            user.save();
            Logger.debug('Intialized Root User');
          })
          .catch((err) => {
            Logger.debug('Error initializing Root User', err);
          });
      }
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
    const {
      MONGO_DB_HOST,
      MONGO_DB_PORT,
      MONGO_DB_NAME,
      MONGO_DB_USERNAME,
      MONGO_DB_PASSWORD,
    } = process.env;
    try {
      mongoose.connect(`mongodb://${MONGO_DB_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`, {
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

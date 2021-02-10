import 'dotenv/config';
import { Logger, validateEnv } from '@server/utils';
import { scheduler } from '@server/agendas/scheduler';
import App from '@server/app';
import {
  OptionController,
  MediaController,
  AuthController,
  ContentController,
  StudyFieldController,
  PartnerController,
  GroupController,
  RoleController,
  MemberController,
  UserController,
  EventController,
  JobController,
} from '@server/controllers';

// Validate Environment-variables
validateEnv();

const app = new App([
  new OptionController(),
  new MediaController(),
  new AuthController(),
  new ContentController(),
  new StudyFieldController(),
  new PartnerController(),
  new GroupController(),
  new RoleController(),
  new MemberController(),
  new UserController(),
  new EventController(),
  new JobController(),
]);
app.listen();

scheduler();

process.on('unhandledRejection', (err: any) => {
  Logger.error(err.name, err.message);
  Logger.debug('UNHANDLED REJECTION! 💥 Shutting down...');
  process.exit(1);
});

process.on('uncaughtException', (err: any) => {
  Logger.error(err.name, err.message);
  Logger.debug('UNCAUGHT EXCEPTION! 💥 Shutting down...');

  process.exit(1);
});

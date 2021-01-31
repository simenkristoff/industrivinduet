import { cleanEnv, port, str, url, host } from 'envalid';

function validateEnv(): void {
  cleanEnv(process.env, {
    SERVER_PORT: port(),
    DB_HOST: host(),
    DB_PORT: port(),
    DB_NAME: str(),
    JWT_SECRET_KEY: str(),
    SERVER_SEEDS_PATH: str(),
    SERVER_LOGS_PATH: str(),
  });
}

export default validateEnv;

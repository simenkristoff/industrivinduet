import { cleanEnv, port, str, num, url, host } from 'envalid';

function validateEnv(): void {
  cleanEnv(process.env, {
    SERVER_PORT: port(),
    MONGO_DB_HOST: host(),
    MONGO_DB_PORT: port(),
    MONGO_DB_NAME: str(),
    BCRYPT_SALT_ROUNDS: num(),
    JWT_SECRET_KEY: str(),
    SERVER_SEEDS_PATH: str(),
    UPLOAD_DIR: str(),
    UPLOAD_MAX_SIZE: num(),
    SERVER_LOGS_PATH: str(),
    LOG_DIR_NAME: str(),
    LOG_FILE_NAME: str(),
    LOG_MAX_SIZE: num(),
    LOG_MAX_FILE: num(),
    LOG_DATE_PATTERN: str(),
  });
}

export default validateEnv;

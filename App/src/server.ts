import express from 'express';
import winston from 'winston';
import Routes from './controllers/routes';
import errorHandler from './middlewares/error-handler';
import httpLogger from './middlewares/http-logger';
import logger, { consoleLoggerFormat } from './utils/logger';

const app = express();
const port = 3000;

export default async () => {
  app.use(express.json());
  app.use(httpLogger);

  app.use(Routes);

  app.use(errorHandler);

  app.listen(port, () => {
    logger.info(`app listening on port ${port}`);
  });
};

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: consoleLoggerFormat,
      level: 'debug',
    }),
  );
}

import { NextFunction, Request, Response } from 'express';
import { Error, ErrorStatusCodes } from '../types';
import { logger } from '../utils';

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  if (!error.type) {
    logger.error(error);
    return res
      .status(ErrorStatusCodes.SERVER_ERROR)
      .send({ error: 'Something went wrong!' });
  }
  logger.warn(error);
  return res
    .status(error.type)
    .send({ error: error.message, sql: error.sqlMessage });
};

export default errorHandler;

import { Response, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorStatusCodes } from '../types';
import { parseError } from '../utils';

const config = require('../env.json')[process.env.NODE_ENV || 'development'];

const auth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.header('Authorization');
  const token = header?.split(' ')[1];

  if (!token) {
    const error = parseError({
      setType: ErrorStatusCodes.UNAUTHORIZED,
      message: 'Invalid token',
    });
    return next(error);
  }
};

export default auth;

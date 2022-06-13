import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorStatusCodes, RequestWithUser } from '../types';
import parseError from '../utils/helperFunctions';

const config = require('../env.json')[process.env.NODE_ENV || 'development'];

const auth =
  () => (req: RequestWithUser, res: Response, next: NextFunction) => {
    const header = req.header('Authorization');
    const token = header?.split(' ')[1];

    if (!token) {
      const error = parseError({
        setType: ErrorStatusCodes.UNAUTHORIZED,
        message: 'Invalid token',
      });
      return next(error);
    }

    try {
      const decodedUser = jwt.verify(token, config.jwtKey);
      if (!decodedUser) {
        const error = parseError({
          setType: ErrorStatusCodes.FORBIDDEN,
          message: 'Forbidden access',
        });
        return next(error);
      }
      req.user = decodedUser;

      return next();
    } catch (ex: any) {
      const error = parseError({
        setType: ErrorStatusCodes.UNAUTHORIZED,
        message: 'Invalid token',
        stack: ex.stack,
        name: ex.name,
      });
      return next(error);
    }
  };

export default auth;

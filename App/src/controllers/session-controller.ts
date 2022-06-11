import express, { NextFunction, Request, Response } from 'express';
import login from '../services/session-service';
import parseError from '../utils/helperFunctions';

const SessionController = express.Router();

// POST: /auth/login
SessionController.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { idDocument, password } = req.body;
      if (!idDocument) throw new Error('idDocument is missing');
      if (!password) throw new Error('password is missing');

      const token = await login(idDocument, password);
      return res.send({ token });
    } catch (err: any) {
      const error = parseError(err);
      return next(error);
    }
  },
);

export default SessionController;

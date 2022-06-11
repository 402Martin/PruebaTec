import { NextFunction, Response, Router } from 'express';
import { getTransactions } from '../services/transaction-services';
import { RequestWithUser } from '../types';
import parseError from '../utils/helperFunctions';

const TransactionsController = Router();

// POST: /transactions
TransactionsController.get(
  '/',
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { query } = req;
      const transactions = await getTransactions(query, req.user.idDocument);
      return res.send(transactions);
    } catch (err: any) {
      const error = parseError(err);
      return next(error);
    }
  },
);

export default TransactionsController;

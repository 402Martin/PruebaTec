import { NextFunction, Request, Response, Router } from 'express';
import { getTransactions } from '../services/transaction-services';
import parseError from '../utils/helperFunctions';

const TransactionsController = Router();

// POST: /transactions
TransactionsController.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req;
      const transactions = await getTransactions(query);
      return res.send(transactions);
    } catch (err: any) {
      const error = parseError(err);
      return next(error);
    }
  },
);

export default TransactionsController;

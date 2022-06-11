import { NextFunction, Request, Response, Router } from 'express';
import { createTransaction } from '../services/transaction-services';
import parseError from '../utils/helperFunctions';

const TransactionsController = Router();

// POST: /transactions
TransactionsController.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { transaction } = req.body;
      const createdTransaction = await createTransaction(transaction);
      return res.send(createdTransaction);
    } catch (err: any) {
      const error = parseError(err);
      return next(error);
    }
  },
);

export default TransactionsController;

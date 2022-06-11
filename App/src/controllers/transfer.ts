import { NextFunction, Request, Response, Router } from 'express';
import { createTransaction } from '../services/transaction-services';
import parseError from '../utils/helperFunctions';

const TransferController = Router();

// POST: /transfer
TransferController.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transaction = req.body;
      console.log(transaction);
      const createdTransaction = await createTransaction(transaction);
      return res.send(createdTransaction);
    } catch (err: any) {
      const error = parseError(err);
      return next(error);
    }
  },
);

export default TransferController;

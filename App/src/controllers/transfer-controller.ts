import { NextFunction, Response, Router } from 'express';
import { createTransaction } from '../services/transaction-services';
import { RequestWithUser } from '../types';
import parseError from '../utils/helperFunctions';

const TransferController = Router();

// POST: /transfer
TransferController.post(
  '/',
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const transaction = req.body;
      const createdTransaction = await createTransaction(
        transaction,
        req.user.idDocument,
      );
      return res.send(createdTransaction);
    } catch (err: any) {
      const error = parseError(err);
      return next(error);
    }
  },
);

export default TransferController;

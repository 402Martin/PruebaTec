import { Router } from 'express';
import TransactionsController from './transactions-controller';
import TransferController from './transfer';

const routes = Router();

routes.use('/transactions', TransactionsController);
routes.use('/transfer', TransferController);

export default routes;

import { Router } from 'express';
import SessionController from './session-controller';
import TransactionsController from './transactions-controller';
import TransferController from './transfer-controller';

const routes = Router();

routes.use('/transactions', TransactionsController);
routes.use('/transfer', TransferController);
routes.use('/login', SessionController);

export default routes;

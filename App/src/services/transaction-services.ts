import Database from '../db/database';
import { Transaction } from '../types';

const { models } = Database.mysql;

const createTransaction = async (
  transactionIn: Transaction,
): Promise<Transaction> => {
  const transaction = await models.Transaction.create(transactionIn);
  return transaction;
};
const getTransaction = async (
  sourceAccountID: number,
): Promise<Transaction> => {
  const transaction = await models.Transaction.findOne({
    accountFrom: sourceAccountID,
  });
  return transaction;
};

export { createTransaction, getTransaction };

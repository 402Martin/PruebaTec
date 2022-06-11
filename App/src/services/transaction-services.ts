import Database from '../db/database';
import { Transaction } from '../types';

const { Op } = require('sequelize');

const { models } = Database.mysql;

const createTransaction = async (
  transactionIn: Transaction,
): Promise<Transaction> => {
  models.Transaction.validate(transactionIn);
  const transaction = await models.Transaction.create(transactionIn);
  return transaction;
};
const getTransactions = async (query: any): Promise<Transaction> => {
  const where: { date?: any; accountFrom?: number } = {};

  if (query.from && query.to)
    where.date = { [Op.between]: [query.from, query.to] };
  else if (query.from) where.date = { [Op.gte]: query.from };
  else if (query.to) where.date = { [Op.lte]: query.to };
  if (query.sourceAccountId) where.accountFrom = query.sourceAccountId;

  const transaction = await models.Transaction.findAll({
    where,
  });
  return transaction;
};

export { createTransaction, getTransactions };

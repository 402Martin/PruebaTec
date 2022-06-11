import Database from '../db/database';
import { Transaction } from '../types';
import { getAccount, isOwner } from './account-service';

const { Op } = require('sequelize');

const { models } = Database.mysql;

const createTransaction = async (
  transactionIn: Transaction,
  idDocument: number,
) => {
  models.Transaction.validate(transactionIn);
  const account = await getAccount(idDocument, transactionIn.accountFrom);

  if (account.amount < transactionIn.amount)
    throw new Error('Not enough money');

  const transaction = await models.Transaction.create(transactionIn);
  return transaction;
};

const getTransactions = async (
  query: any,
  idDocument: number,
): Promise<Transaction> => {
  const accounts = await isOwner(idDocument, query.sourceAccountId);

  const where: { date?: any; accountFrom?: any } = {
    accountFrom: { [Op.in]: accounts.map((account) => account.id) },
  };

  if (query.from && query.to)
    where.date = { [Op.between]: [query.from, query.to] };
  else if (query.from) where.date = { [Op.gte]: query.from };
  const transaction = await models.Transaction.findAll({
    where,
  });
  return transaction;
};

export { createTransaction, getTransactions };

import Database from '../db/database';
import { Account, Transaction } from '../types';
import { getAccount, isOwner } from './account-service';

const { Op } = require('sequelize');

const { models } = Database.mysql;

const calcuateAmountTo = async (
  transactionIn: Transaction,
  accountTo: Account,
  accountFrom: Account,
) => {
  let amountToDeposit = transactionIn.amount;
  if (accountTo.currencyId !== accountFrom.currencyId) {
    const currencyTo = await models.Currency.findOne({
      where: { id: accountTo.currencyId },
    });

    const euro = await models.Currency.findOne({
      where: { idCurrency: 'EUR' },
    });

    amountToDeposit =
      (transactionIn.amount / euro.eurRate) * currencyTo.eurRate;
  }
  return amountToDeposit;
};

const createTransaction = async (
  transactionIn: Transaction,
  idDocument: number,
) => {
  models.Transaction.validate(transactionIn);
  const accountFrom = await getAccount(
    idDocument,
    transactionIn.accountFrom,
    true,
  );
  const accountTo = await getAccount(idDocument, transactionIn.accountTo);

  if (accountFrom.amount < transactionIn.amount)
    throw new Error('Not enough money');

  const amountToDeposit = await calcuateAmountTo(
    transactionIn,
    accountTo,
    accountFrom,
  );

  const transaction = await models.Transaction.create(transactionIn);
  await models.Account.update(
    { amount: parseFloat(accountFrom.amount) - transaction.amount },
    { where: { id: transaction.accountFrom } },
  );
  await models.Account.update(
    { amount: parseFloat(accountTo.amount) + amountToDeposit },
    { where: { id: transaction.accountTo } },
  );

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

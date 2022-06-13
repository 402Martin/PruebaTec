import Database from '../db/database';
import { Account, Transaction } from '../types';
import { logger } from '../utils';
import { getAccount, isOwner } from './account-service';

const { Op } = require('sequelize');

const { models } = Database.mysql;

const calcuateAmountTo = async (
  transactionIn: Transaction,
  accountTo: Account,
  accountFrom: Account,
) => {
  logger.info(`Calculating amount in account to Currency `);
  let amountToDeposit = transactionIn.amount;
  if (accountTo.currencyId !== accountFrom.currencyId) {
    const currencyTo = await models.Currency.findOne({
      where: { id: accountTo.currencyId },
    });

    const currencyFrom = await models.Currency.findOne({
      where: { id: accountFrom.currencyId },
    });

    amountToDeposit =
      (transactionIn.amount / currencyFrom.eurRate) * currencyTo.eurRate;
  }
  return amountToDeposit;
};

const createTransaction = async (
  transactionIn: Transaction,
  idDocument: number,
) => {
  logger.info(
    `Validating transaction from ${transactionIn.accountFrom} to ${transactionIn.accountTo}`,
  );
  const trans = await Database.mysql.transaction();
  try {
    models.Transaction.validate(transactionIn);
    const accountFrom = await getAccount(
      idDocument,
      transactionIn.accountFrom,
      true,
    );
    const accountTo = await getAccount(idDocument, transactionIn.accountTo);
    const totalDeduction =
      accountFrom.userId === accountTo.userId
        ? transactionIn.amount
        : transactionIn.amount * 1.01;

    if (accountFrom.amount < totalDeduction)
      throw new Error('Not enough money');

    const amountToDeposit = await calcuateAmountTo(
      transactionIn,
      accountTo,
      accountFrom,
    );
    console.log(amountToDeposit);
    logger.info(`Creating transaction`);

    const transaction = await models.Transaction.create(transactionIn);

    models.Account.update(
      { amount: parseFloat(accountFrom.amount) - totalDeduction },
      { where: { id: transaction.accountFrom } },
    );
    models.Account.update(
      { amount: parseFloat(accountTo.amount) + amountToDeposit },
      { where: { id: transaction.accountTo } },
    );
    logger.info(`Done with transaction `);
    await trans.commit();
    return transaction;
  } catch (err) {
    await trans.rollback();
    throw err;
  }
};

const getTransactions = async (
  query: any,
  idDocument: number,
): Promise<Transaction> => {
  logger.info(`Getting transactions`);

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

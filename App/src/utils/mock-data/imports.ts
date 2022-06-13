import Database from '../../db/database';
import logger from '../logger';
import data from './data';

const { models } = Database.mysql;
const insertUsers = async () => {
  logger.info('Starting inserting users');
  await models.User.bulkCreate(data.mockedUsers);
  logger.info('Finished inserting users');
};

const insertCurrency = async () => {
  logger.info('Starting inserting currencies');
  await models.Currency.bulkCreate(data.mockedCurrency);
  logger.info('Finished inserting currencies');
};

const insertAccounts = async () => {
  logger.info('Starting inserting accounts');
  await models.Account.bulkCreate(data.mockedAccounts);
  logger.info('Finished inserting accounts');
};

const insertTransactions = async () => {
  logger.info('Starting inserting transactions');
  await models.Transaction.bulkCreate(data.mockedTransactions);
  logger.info('Finished inserting transactions');
};

const insertMockedData = async () => {
  try {
    await insertCurrency();
    await insertUsers();
    await insertAccounts();
    await insertTransactions();
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

export default insertMockedData;

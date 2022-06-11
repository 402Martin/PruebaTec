import Database from '../../db/database';
import logger from '../logger';
import data from './data';

const { models } = Database.mysql;
const insertUsers = async () => {
  data.mockedUsers.map(async (user) => {
    models.User.validate(user);
    const userdb = await models.User.create(user);
    return userdb;
  });
};

const insertCurrency = async () => {
  data.mockedCurrency.map(async (currency) => {
    const currencydb = await models.Currency.create(currency);
    return currencydb;
  });
};

// const insertAccounts = async () => {
//   throw new Error('not implemented');
// };

const insertMockedData = async () => {
  try {
    await insertCurrency();
    await insertUsers();
    //   insertAccounts();
    return true;
  } catch (err) {
    logger.error(err);
    return false;
  }
};

export default insertMockedData;

import Database from '../db/database';
import getQuotes from '../helpers/fixer-helper';
import { logger } from '../utils';

const { models } = Database.mysql;

const setCurrencies = async () => {
  try {
    const rates = await getQuotes();

    await models.Currency.update(
      { eurRate: rates.UYU },
      { where: { idCurrency: 'UYU' } },
    );
    await models.Currency.update(
      { eurRate: rates.USD },
      { where: { idCurrency: 'USD' } },
    );
  } catch (err) {
    logger.error(err);
  }
};

export default setCurrencies;

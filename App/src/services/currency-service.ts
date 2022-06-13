import Database from '../db/database';
import getQuotes from '../helpers/fixer-helper';

const { models } = Database.mysql;

const setCurrencies = async () => {
  const rates = await getQuotes();

  await models.Currency.update(
    { eurRate: rates.UYU },
    { where: { idCurrency: 'UYU' } },
  );
  await models.Currency.update(
    { eurRate: rates.USD },
    { where: { idCurrency: 'USD' } },
  );
};

export default setCurrencies;

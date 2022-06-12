import Database from './src/db/database';
import getQuotes from './src/helpers/fixer-helper';
import serverInit from './src/server';
import setCurrencies from './src/services/currency-service';
import { logger } from './src/utils';
import insertMockedData from './src/utils/mock-data/imports';

(async () => {
  try {
    const success = await Database.init();
    if (!success) throw new Error('Databases init failed');

    // const succesInserts = await insertMockedData();

    // if (!succesInserts) throw new Error('Databases init failed');

    await serverInit();

    setCurrencies();
  } catch (err) {
    logger.error(`Error initializing server: ${err}`);
    process.exit(1);
  }
})();

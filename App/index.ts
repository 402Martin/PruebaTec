import Database from './src/db/database';
import serverInit from './src/server';
import getQuotes from './src/services/fixer-service';
import { logger } from './src/utils';
import insertMockedData from './src/utils/mock-data/imports';

(async () => {
  try {
    const success = await Database.init();
    if (!success) throw new Error('Databases init failed');

    const succesInserts = await insertMockedData();

    if (!succesInserts) throw new Error('Databases init failed');

    await serverInit();
    getQuotes();
  } catch (err) {
    logger.error(`Error initializing server: ${err}`);
    process.exit(1);
  }
})();

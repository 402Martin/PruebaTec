import Database from './src/db/database';
import serverInit from './src/server';
import { logger } from './src/utils';

(async () => {
  try {
    const success = await Database.init();
    if (!success) throw new Error('Databases init failed');

    await serverInit();
  } catch (err) {
    logger.error(`Error initializing server: ${err}`);
    process.exit(1);
  }
})();

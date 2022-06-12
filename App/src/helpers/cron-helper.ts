import cron from 'node-cron';
import setCurrencies from '../services/currency-service';
import { logger } from '../utils';

const currencyCron = async () => {
  cron.schedule('* * * * *', async () => {
    logger.info('Starting running  Currency cron');
    await setCurrencies();
    logger.info('Finished running currency cron');
  });
};

export default currencyCron;

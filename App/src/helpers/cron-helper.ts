import cron from 'node-cron';
import setCurrencies from '../services/currency-service';
import { logger } from '../utils';

const config = require('../env.json')[process.env.NODE_ENV || 'development'];

const currencyCron = async () => {
  cron.schedule('* * * * *', async () => {
    logger.info('Starting running  Currency cron');
    if (!config.development) await setCurrencies();
    logger.info('Finished running currency cron');
  });
};

export default currencyCron;

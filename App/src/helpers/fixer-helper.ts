import axios from 'axios';
import { logger } from '../utils';

const config = require('../env.json')[process.env.NODE_ENV || 'development'];

const getQuotes = async () => {
  logger.info(`Getting quotes`);
  const response = await axios.get(config.fixerurl, {
    headers: {
      apikey: config.fixerKey,
    },
  });
  logger.info(` quotes retrieved`);

  const { rates } = response.data;
  return rates;
};

export default getQuotes;

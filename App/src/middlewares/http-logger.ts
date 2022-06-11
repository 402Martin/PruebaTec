import morgan from 'morgan';
import { logger } from '../utils';

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf('\n')));
  },
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development';
};

export default morgan('combined', { stream, skip });

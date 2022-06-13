import { logger } from '../utils';
import mysqlModels from './models';

const { Sequelize } = require('sequelize');
const config = require('../env.json')[process.env.NODE_ENV || 'development'];

const Database: any = {};

Database.mysql = new Sequelize(
  config.mysql.name,
  config.mysql.user,
  config.mysql.password,
  {
    logging: (msg: any) => logger.debug(msg),
    host: config.mysql.host,
    dialect: 'mysql',
    define: {
      timestamps: false,
    },
  },
);

const initMySQL = async () => {
  try {
    logger.info('Trying to connect to MYSQL Database.');
    await Database.mysql.authenticate();
    Database.models = mysqlModels(Database.mysql);

    // Recreates database each time
    if (config.development) await Database.mysql.sync({ force: true });
    logger.info(
      'Connection to MYSQL Database has been established successfully.',
    );
    return true;
  } catch (error) {
    logger.error('Unable to connect to MYSQL database:', error);
    return false;
  }
};
Database.init = async () => {
  const [mysql] = await Promise.all([initMySQL()]);
  return mysql;
};

export default Database;

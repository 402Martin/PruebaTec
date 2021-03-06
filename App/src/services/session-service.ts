import jwt from 'jsonwebtoken';
import Database from '../db/database';
import { logger } from '../utils';

const config = require('../env.json')[process.env.NODE_ENV || 'development'];

const { models } = Database.mysql;

const login = async (idDocument: String, password: String) => {
  logger.info(`Login attempt by ${idDocument}`);

  const userdb = await models.User.findOne({ where: { idDocument, password } });

  if (!userdb) {
    throw new Error('Invalid Credentials');
  }
  // create token
  const token = jwt.sign(
    {
      idDocument: userdb.idDocument,
    },
    config.jwtKey as string,
  );
  logger.info(`${idDocument} has logged in`);
  return token;
};

export default login;

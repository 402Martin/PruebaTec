import Database from '../db/database';
import { logger } from '../utils';

const { models } = Database.mysql;

const isOwner = async (idDocument: number, idAccount: number) => {
  logger.info(`Validating ownership`);

  const user = await models.User.findOne({ where: { idDocument } });
  const where: { userId: number; id?: number } = idAccount
    ? { userId: user.id, id: idAccount }
    : { userId: user.id };

  const isOwnerOfAccounts = await models.Account.findAll({
    where,
  });
  logger.info(`Finished validating ownership`);

  return isOwnerOfAccounts;
};

const getAccount = async (
  idDocument: number,
  idAccount: number,
  isFromUser: boolean = false,
) => {
  logger.info(`Getting account`);
  const user = await models.User.findOne({ where: { idDocument } });
  const where: { userId?: number; id?: number } = isFromUser
    ? { userId: user.id, id: idAccount }
    : { id: idAccount };

  const account = await models.Account.findOne({
    where,
  });

  logger.info(`finished getting account`);
  if (!account) throw new Error('Account not found');

  return account;
};

export { isOwner, getAccount };

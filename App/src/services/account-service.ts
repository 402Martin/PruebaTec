import Database from '../db/database';

const { models } = Database.mysql;

const isOwner = async (idDocument: number, idAccount: number) => {
  const user = await models.User.findOne({ where: { idDocument } });
  const where: { userId: number; id?: number } = idAccount
    ? { userId: user.id, id: idAccount }
    : { userId: user.id };

  const isOwnerOfAccounts = await models.Account.findAll({
    where,
  });
  return isOwnerOfAccounts;
};

const getAccount = async (idDocument: number, idAccount: number) => {
  const user = await models.User.findOne({ where: { idDocument } });
  const where: { userId: number; id?: number } = {
    userId: user.id,
    id: idAccount,
  };

  const account = await models.Account.findOne({
    where,
  });

  if (!account) throw new Error('Account not found');

  return account;
};

export { isOwner, getAccount };

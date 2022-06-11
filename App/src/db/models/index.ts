import UserModel from './User';
import CurrencyModel from './Currency';
import AccountModel from './Account';
import TransactionModel from './Transaction';

const initializeModels = (sequelize: any) => {
  const models: any = {
    User: UserModel(sequelize),
    Currency: CurrencyModel(sequelize),
    Account: AccountModel(sequelize),
    Transaction: TransactionModel(sequelize),
  };

  Object.keys(models).forEach((model: any) => {
    if ('associate' in models[model]) {
      // call the associate function and pass reference to all other models
      models[model].associate(models);
    }
  });
  return models;
};
export default initializeModels;

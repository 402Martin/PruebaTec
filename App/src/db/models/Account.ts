import DataTypes from 'sequelize';

const Account = (sequelize: any) => {
  const AccountModel = sequelize.define('Account', {
    amount: {
      type: DataTypes.DECIMAL(8, 4),
      allowNull: false,
      unique: false,
      validate: {
        notNull: true,
      },
    },
  });
  AccountModel.associate = (models: any) => {
    AccountModel.user = AccountModel.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
        name: 'userId',
      },
    });
    AccountModel.currency = AccountModel.belongsTo(models.Currency, {
      foreignKey: {
        allowNull: false,
        name: 'currencyId',
      },
    });
  };

  return AccountModel;
};

export default Account;

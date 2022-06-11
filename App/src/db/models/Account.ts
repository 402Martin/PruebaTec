import DataTypes from 'sequelize';

const Account = (sequelize: any) => {
  const AccountModel = sequelize.define('Account', {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        isNumeric: true,
        isInt: true,
      },
    },
  });
  AccountModel.associate = (models: any) => {
    AccountModel.user = AccountModel.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    AccountModel.currency = AccountModel.belongsTo(models.Currency, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return AccountModel;
};

export default Account;

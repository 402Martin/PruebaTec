import DataTypes from 'sequelize';
import { Transaction } from '../../types';

const Transaction = (sequelize: any) => {
  const TransactionModel = sequelize.define('Transaction', {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false,
      validate: {
        notNull: true,
        isNumeric: true,
        isInt: true,
      },
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false,
      validate: {
        notNull: true,
        isDate: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notNull: true,
      },
    },
  });
  TransactionModel.associate = (models: any) => {
    TransactionModel.originAccount = TransactionModel.belongsTo(
      models.Account,
      {
        foreignKey: {
          allowNull: false,
          name: 'accountFrom',
        },
      },
    );
    TransactionModel.destinationAccount = TransactionModel.belongsTo(
      models.Account,
      {
        foreignKey: {
          allowNull: false,
          name: 'accountTo',
        },
      },
    );
  };

  TransactionModel.validate = (transaction: Transaction) => {
    if (!transaction.amount || transaction.amount > 0) {
      throw new Error('Amount is incorrect');
    }
  };

  return TransactionModel;
};

export default Transaction;

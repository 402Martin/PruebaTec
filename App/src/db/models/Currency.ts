import DataTypes from 'sequelize';

const Currency = (sequelize: any) => {
  const CurrencyModel = sequelize.define('Currency', {
    idCurrency: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
      },
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notNull: true,
      },
    },
    eurRate: {
      type: DataTypes.DECIMAL(8, 4),
      allowNull: false,
      defaultValue: 1,
      unique: false,
      validate: {
        notNull: true,
      },
    },
  });
  CurrencyModel.associate = (models: any) => {};
  // associations can be defined here

  return CurrencyModel;
};

export default Currency;

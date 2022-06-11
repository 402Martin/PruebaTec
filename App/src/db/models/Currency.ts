import DataTypes from 'sequelize';

const Currency = (sequelize: any) => {
  const CurrencyModel = sequelize.define('Currency', {
    idCurrency: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        isNumeric: true,
        isInt: true,
      },
    },
    Currency: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notNull: true,
        is: /^[A-Za-z\s']+$/,
      },
    },
  });
  CurrencyModel.associate = (models: any) => {};
  // associations can be defined here

  return CurrencyModel;
};

export default Currency;

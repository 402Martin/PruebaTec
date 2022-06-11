import DataTypes from 'sequelize';

const User = (sequelize: any) => {
  const UserModel = sequelize.define('User', {
    idDocument: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        isNumeric: true,
        isInt: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      validate: {
        notNull: true,
        is: /^[A-Za-z\s']+$/,
      },
    },
  });
  UserModel.associate = (models: any) => {};
  // associations can be defined here

  return UserModel;
};

export default User;

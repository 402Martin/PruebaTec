import DataTypes from 'sequelize';
import { User } from '../../types';

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
    },
  });

  UserModel.validate = (user: User) => {
    if (!(user.idDocument < 100000 || user.idDocument > 1000000)) {
      throw new Error('user document incorrect');
    }
    if (!user.password || user.password?.length < 4) {
      throw new Error('password must at least be 4 characters');
    }
  };

  return UserModel;
};

export default User;

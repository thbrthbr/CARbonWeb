const { DataTypes } = require('sequelize');

const Users = (sequelize) => {
  const Users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    isDriver: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    hasCar: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    carpoolCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });
  return Users;
};

module.exports = Users;

const { DataTypes } = require('sequelize');

const Mate = (sequelize) => {
  const Mate = sequelize.define('mates', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    mateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mateRealId: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    mateNickname: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    mateListId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    departures: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    arrivals: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    departuresLatitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    departuresLongitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    arrivalsLatitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    arrivalsLongitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  return Mate;
};

module.exports = Mate;

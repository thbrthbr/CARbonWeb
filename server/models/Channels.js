const { DataTypes } = require('sequelize');

const Channels = (sequelize) => {
  const Channels = sequelize.define('channels', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hostRealId: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    hostNickname: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    driverNickname: {
      type: DataTypes.STRING(200),
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
    mateListId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    regular: {
      type: DataTypes.BOOLEAN,
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
    content: {
      type: DataTypes.STRING(455),
    },
    personnel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    curpersonnel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Channels;
};

module.exports = Channels;

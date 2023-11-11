const { DataTypes } = require('sequelize');

const FootPrints = (sequelize) => {
  const FootPrints = sequelize.define('footPrints', {
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
    year: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    month: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    day: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    emissions: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },
  });
  return FootPrints;
};

module.exports = FootPrints;

'use strict';

require('dotenv').config();
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')['production'];

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

//모델
db.FootPrints = require('./FootPrints')(sequelize);
db.Users = require('./Users')(sequelize);
db.Channels = require('./Channels')(sequelize);
db.Mate = require('./Mate')(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

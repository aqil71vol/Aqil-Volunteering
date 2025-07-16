const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// استيراد النموذج
const DataEntry = require('./data_entry')(sequelize, DataTypes);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataEntry = DataEntry;

module.exports = db;

const path = require('path');
const { Sequelize } = require('sequelize');

const dbPath = process.env.DB_PATH || 'database/helphub.sqlite';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(process.cwd(), dbPath),
  logging: false,
});

module.exports = sequelize;

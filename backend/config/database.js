const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('flightdb', 'admin', 'secret', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433,
});

module.exports = sequelize;

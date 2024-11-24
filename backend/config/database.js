const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME || 'flightdb',
  process.env.DATABASE_USER || 'admin',
  process.env.DATABASE_PASSWORD || 'secret',
  {
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: 'postgres',
    port: process.env.DATABASE_PORT || 5433,
    logging: process.env.SEQUELIZE_LOGGING === 'true' ? console.log : false, // כיבוי לוגים כברירת מחדל
  }
);

module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false, // הימנע מבעיות תעודות
    },
  },
  logging: false, // ביטול לוגים של Sequelize
  retry: {
    max: 10, // נסה להתחבר 10 פעמים לפני כשל
  },
});

module.exports = sequelize;

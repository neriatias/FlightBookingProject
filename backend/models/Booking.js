const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
  flightId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  passengerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seatNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Booking;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const TimeClockLog = sequelize.define('TimeClockLog', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  photo: {
    type: DataTypes.TEXT('long'), // For base64 image data
  },
  location: {
    type: DataTypes.JSON,
  },
  address: {
    type: DataTypes.STRING,
  }
});

module.exports = TimeClockLog;

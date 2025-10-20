const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const SalesReport = sequelize.define('SalesReport', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  itemName: {
    type: DataTypes.STRING,
  },
  beginning: {
    type: DataTypes.INTEGER,
  },
  remaining: {
    type: DataTypes.INTEGER,
  },
  sold: {
    type: DataTypes.INTEGER,
  }
});

module.exports = SalesReport;

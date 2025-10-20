const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Manager', 'Employee'),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Active'
  },
  ratePerDay: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
});

module.exports = User;

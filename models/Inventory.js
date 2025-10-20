const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Inventory = sequelize.define('Inventory', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  supplier: {
    type: DataTypes.STRING,
  }
});

module.exports = Inventory;

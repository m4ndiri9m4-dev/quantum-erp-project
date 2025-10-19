const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const Project = sequelize.define('Project', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
  },
  startDate: {
    type: DataTypes.DATEONLY,
  },
  endDate: {
    type: DataTypes.DATEONLY,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Not Started'
  },
  tasks: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  assignedEmployees: {
    type: DataTypes.JSON,
    defaultValue: []
  }
});

module.exports = Project;

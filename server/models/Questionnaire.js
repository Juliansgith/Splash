const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

const Questionnaire = sequelize.define('Questionnaire', {
  title: DataTypes.STRING,
  isActive: DataTypes.BOOLEAN,
  points: DataTypes.INTEGER,
  company: DataTypes.STRING,
}, {
  tableName: 'Questionnaires'
});

module.exports = { Questionnaire };

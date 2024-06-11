const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');
const { Questionnaire } = require('./Questionnaire');

const Question = sequelize.define('Question', {
  questionText: DataTypes.STRING,
  questionnaireId: {
    type: DataTypes.INTEGER,
    references: {
      model: Questionnaire,
      key: 'id'
    }
  }
}, {
  tableName: 'Questions'
});

module.exports = { Question };

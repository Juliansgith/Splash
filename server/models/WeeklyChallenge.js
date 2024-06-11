const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');
const { User } = require('./User');
const { Questionnaire } = require('./Questionnaire');

const WeeklyChallenge = sequelize.define('WeeklyChallenge', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  week: DataTypes.INTEGER,
  year: DataTypes.INTEGER,
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  questionnaireId: {
    type: DataTypes.INTEGER,
    references: {
      model: Questionnaire,
      key: 'id'
    }
  }
}, {
  tableName: 'WeeklyChallenges' // Explicitly setting table name
});

module.exports = { WeeklyChallenge };

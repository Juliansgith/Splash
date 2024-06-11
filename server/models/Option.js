const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');
const { Question } = require('./Question');

const Option = sequelize.define('Option', {
  text: DataTypes.STRING,
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  questionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Question,
      key: 'id'
    }
  }
}, {
  tableName: 'Options'
});

module.exports = { Option };

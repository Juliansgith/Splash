const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

const Questionnaire = sequelize.define('Questionnaire', {
    title: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    points: DataTypes.INTEGER,
    company: DataTypes.STRING
}, {
    tableName: 'Questionnaires' // Explicitly setting table name
});

const Question = sequelize.define('Question', {
    questionText: DataTypes.STRING
}, {
    tableName: 'Questions' // Explicitly setting table name
});

const Option = sequelize.define('Option', {
    text: DataTypes.STRING,
    count: DataTypes.INTEGER
}, {
    tableName: 'Options' // Explicitly setting table name
});

module.exports = { Questionnaire, Question, Option };

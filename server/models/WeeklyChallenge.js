const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

const WeeklyChallenge = sequelize.define('WeeklyChallenge', {
    week: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    // Removed explicit foreign key definitions to simplify and avoid issues
}, {
    tableName: 'WeeklyChallenges' // Explicitly setting table name
});

module.exports = { WeeklyChallenge };

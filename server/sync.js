const sequelize = require('./db/conn');
const { applyAssociations } = require('./associate');

const { User } = require('./models/User');
const { Questionnaire, Question, Option } = require('./models/Questionnaire');
const { WeeklyChallenge } = require('./models/WeeklyChallenge');

// Apply associations
applyAssociations();

sequelize.sync({ force: true })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Failed to create database and tables', err);
    });

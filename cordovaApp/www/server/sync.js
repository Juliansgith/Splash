const sequelize = require('./db/conn');
const { applyAssociations } = require('./associate');

// Import models to apply associations
const { User } = require('./models/User');
const { Questionnaire } = require('./models/Questionnaire');
const { Question } = require('./models/Question');
const { Option } = require('./models/Option');
const { WeeklyChallenge } = require('./models/WeeklyChallenge');

// Apply associations
applyAssociations();
console.log('Associations applied');

sequelize.sync({ force: true })
  .then(() => {
    console.log('Database & tables created and wiped!');
  })
  .catch(err => {
    console.error('Failed to create and wipe database and tables', err);
  });

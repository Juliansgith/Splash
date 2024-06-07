const { User } = require('./models/User');
const { Questionnaire } = require('./models/Questionnaire');
const { Question } = require('./models/Question');
const { Option } = require('./models/Option');
const { WeeklyChallenge } = require('./models/WeeklyChallenge');

function applyAssociations() {
  Questionnaire.hasMany(Question, { foreignKey: 'questionnaireId' });
  Question.belongsTo(Questionnaire, { foreignKey: 'questionnaireId' });

  Question.hasMany(Option, { foreignKey: 'questionId' });
  Option.belongsTo(Question, { foreignKey: 'questionId' });

  User.belongsToMany(Questionnaire, { through: WeeklyChallenge, foreignKey: 'userId' });
  Questionnaire.belongsToMany(User, { through: WeeklyChallenge, foreignKey: 'questionnaireId' });
}

module.exports = { applyAssociations };

const { User } = require('./models/User');
const { Questionnaire } = require('./models/Questionnaire');
const { WeeklyChallenge } = require('./models/WeeklyChallenge');

function applyAssociations() {
    User.belongsToMany(Questionnaire, { through: WeeklyChallenge, foreignKey: 'userId' });
    Questionnaire.belongsToMany(User, { through: WeeklyChallenge, foreignKey: 'questionnaireId' });
}

module.exports = { applyAssociations };

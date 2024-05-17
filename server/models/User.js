const mongoose = require('mongoose');

const weeklyQuestionnairesSchema = new mongoose.Schema({
  week: Number,
  year: Number,
  questionnaires: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questionnaire',
  }],
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  points: {
    type: Number,
    default: 0,
  },
  questionnairesByWeek: [weeklyQuestionnairesSchema],
});

userSchema.methods.getCurrentWeekYear = function() {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
  const pastDaysOfYear = (currentDate - startOfYear) / 86400000;

  const currentWeek = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  return {
    week: currentWeek,
    year: currentDate.getFullYear(),
  };
};

const User = mongoose.model('User', userSchema);

module.exports = User;

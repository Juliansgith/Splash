const mongoose = require('mongoose');

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
    questionnaires: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questionnaire',
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;

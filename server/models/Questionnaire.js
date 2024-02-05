const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: String,
  count: { type: Number, default: 0 },
});

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [optionSchema],
});

const questionnaireSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
});

module.exports = mongoose.model('Questionnaire', questionnaireSchema);

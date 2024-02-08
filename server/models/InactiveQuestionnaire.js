const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: String,
  count: { type: Number, default: 0 },
});


const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [optionSchema],
});

const inactiveQuestionnaireSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  isActive: { type: Boolean, default: false },
  archivedDate: { type: Date, default: Date.now },
});

const InactiveQuestionnaire = mongoose.model('InactiveQuestionnaire', inactiveQuestionnaireSchema);

module.exports = InactiveQuestionnaire;

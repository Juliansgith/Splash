const express = require('express');
const Questionnaire = require('../models/Questionnaire');
const InactiveQuestionnaire = require('../models/InactiveQuestionnaire')
const User = require('../models/User');
const router = express.Router();
const mongoose = require('mongoose');

  router.post('/create', async (req, res) => {
      console.log("Received request body:", req.body);

      const documentToInsert = {
          title: req.body.title,
          questions: req.body.questions.map(question => ({
              questionText: question.questionText,
              options: question.options.map(option => ({
                  text: option.text,
                  count: 0 
              }))
          }))
      };

      try {
          const result = await mongoose.connection.collection('questionnaires').insertOne(documentToInsert);
          console.log("Document inserted:", result);
          res.status(201).json({ message: "Questionnaire created successfully", documentId: result.insertedId });
      } catch (error) {
          console.error("Error inserting document:", error);
          res.status(400).json({ message: "Failed to create questionnaire", error: error.message });
      }
  });

  router.get('/all', async (req, res) => {
    try {
      const { userId } = req.body; 
      const user = await User.findById(userId);
      const filledQuestionnaireIds = user.questionnaires;
  
      const questionnaires = await Questionnaire.find({ _id: { $nin: filledQuestionnaireIds } });
      res.json(questionnaires);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  router.post('/move-to-inactive/:id', async (req, res) => {
    try {
      const questionnaire = await Questionnaire.findById(req.params.id);
      if (!questionnaire) {
        return res.status(404).send('Questionnaire not found');
      }
  
      const inactiveQuestionnaire = new InactiveQuestionnaire(questionnaire.toObject());
      await inactiveQuestionnaire.save();
  
      await Questionnaire.findByIdAndDelete(req.params.id);
  
      res.send({ message: 'Questionnaire moved to inactive successfully and deleted from active questionnaires.' });
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });
  

  router.get('/:id', async (req, res) => {
    try {
      const questionnaire = await Questionnaire.findById(req.params.id);
      if (!questionnaire) {
        return res.status(404).send('Questionnaire not found');
      }
      res.json(questionnaire);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });

  router.post('/answer/:id', async (req, res) => {
    const { id } = req.params;
    const { answers, userId } = req.body; // Assuming userId is passed in the body. Better to use JWT token to extract userId
  
    if (!answers || typeof answers !== 'object') {
      return res.status(400).send('Invalid answers format.');
    }
  
    try {
      const questionnaire = await Questionnaire.findById(id);
      if (!questionnaire) return res.status(404).send('Questionnaire not found');
  
      Object.entries(answers).forEach(([questionIndex, optionText]) => {
        const question = questionnaire.questions[parseInt(questionIndex)];
        if (!question) {
          throw new Error(`Question at index ${questionIndex} not found`);
        }
        const option = question.options.find(opt => opt.text === optionText);
        if (!option) {
          throw new Error(`Option "${optionText}" not found in question at index ${questionIndex}`);
        }
        option.count += 1;
      });
  
      await questionnaire.save();
  
      await User.findByIdAndUpdate(userId, { $push: { questionnaires: id } });
  
      res.status(200).send(questionnaire);
    } catch (error) {
      console.error(error);
      res.status(400).send(error.message);
    }
  });
  

module.exports = router;

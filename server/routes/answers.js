const express = require('express');
const { Questionnaire } = require('../models/Questionnaire');
const { Question } = require('../models/Question');
const { Option } = require('../models/Option');
const { User } = require('../models/User');
const { WeeklyChallenge } = require('../models/WeeklyChallenge');
const sequelize = require('../db/conn');
const router = express.Router();

router.get('/answers', async (req, res) => {
    try {
        const questionnaires = await Questionnaire.findAll();
        res.json(questionnaires);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/answers2/:id', async (req, res) => {
    try {
      const questionnaire = await Questionnaire.findByPk(req.params.id, {
        include: {
          model: Question,
          include: {
            model: Option
          }
        }
      });
  
      if (!questionnaire) {
        return res.status(404).json({ message: 'Questionnaire not found' });
      }
  
      res.json(questionnaire);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router.get('/answered-per-week', async (req, res) => {
    const { userId } = req.query;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const questionnairesByWeek = user.questionnairesByWeek || [];
  
      const countPerWeek = questionnairesByWeek.map(week => ({
        week: week.week,
        year: week.year,
        count: week.questionnaires.length
      }));
  
      res.json(countPerWeek);
    } catch (error) {
      res.status(500).send(error.toString());
    }
  });
  

module.exports = router;

const express = require('express');
const { Questionnaire } = require('../models/Questionnaire');
const { Question } = require('../models/Question');
const { Option } = require('../models/Option');
const { User } = require('../models/User');
const { WeeklyChallenge } = require('../models/WeeklyChallenge');
const sequelize = require('../db/conn');
const router = express.Router();

router.post('/answer/:id', async (req, res) => {
  const { id } = req.params;
  const { answers, userId } = req.body;

  if (!answers || typeof answers !== 'object') {
    return res.status(400).send('Invalid answers format.');
  }

  if (!userId) {
    return res.status(400).send("User ID is required");
  }

  try {
    const questionnaire = await Questionnaire.findByPk(id, {
      include: {
        model: Question,
        include: {
          model: Option
        }
      }
    });

    if (!questionnaire) return res.status(404).send('Questionnaire not found');

    for (const [questionIndex, optionText] of Object.entries(answers)) {
      const question = questionnaire.Questions[parseInt(questionIndex)];
      if (!question) {
        throw new Error(`Question at index ${questionIndex} not found`);
      }
      const option = question.Options.find(opt => opt.text === optionText);
      if (!option) {
        throw new Error(`Option "${optionText}" not found in question at index ${questionIndex}`);
      }
      option.count += 1;
      await option.save();
    }

    const pointsToAdd = questionnaire.qpoints; // Update to use 'qpoints'
    await User.update(
      { points: sequelize.literal(`points + ${pointsToAdd}`) }, // Ensure this is correct
      { where: { id: userId } }
    );

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).send('User not found');

    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const pastDaysOfYear = (currentDate - startOfYear) / 86400000;
    const week = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    const year = currentDate.getFullYear();

    await WeeklyChallenge.create({
      week,
      year,
      userId,
      questionnaireId: id
    });

    res.status(200).send(questionnaire);
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
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

    // Change the structure of the returned JSON if needed
    res.json({ ...questionnaire.toJSON(), points: questionnaire.qpoints }); // Assuming the internal attribute is now qpoints
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

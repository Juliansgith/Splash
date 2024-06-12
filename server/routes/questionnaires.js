const express = require('express');
const { Questionnaire } = require('../models/Questionnaire');
const { Question } = require('../models/Question');
const { Option } = require('../models/Option');
const { User } = require('../models/User');
const { WeeklyChallenge } = require('../models/WeeklyChallenge');
const sequelize = require('../db/conn');
const router = express.Router();

router.post('/create', async (req, res) => {
  console.log("Received request body:", req.body);

  try {
    const { title, company, questions, qpoints, isActive } = req.body;

    const questionnaire = await Questionnaire.create({
      title,
      company,
      qpoints, 
      isActive: isActive ?? true  
    });

    for (const question of questions) {
      const createdQuestion = await Question.create({
        questionText: question.questionText,
        questionnaireId: questionnaire.id
      });

      for (const option of question.options) {
        await Option.create({
          text: option.text,
          count: 0,
          questionId: createdQuestion.id
        });
      }
    }

    console.log("Document inserted:", questionnaire);
    res.status(201).json({ message: "Questionnaire created successfully", documentId: questionnaire.id });
  } catch (error) {
    console.error("Error inserting document:", error);
    res.status(400).json({ message: "Failed to create questionnaire", error: error.message });
  }
});


router.get('/all', async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const questionnairesByWeek = await WeeklyChallenge.findAll({
      where: { userId },
      attributes: ['questionnaireId']
    });

    const completedQuestionnaires = questionnairesByWeek.map(entry => entry.questionnaireId);

    const allQuestionnaires = await Questionnaire.findAll({
      attributes: ['id', 'title', 'qpoints', 'company', 'isActive'],  // Ensure 'qpoints' is included
      include: [{
        model: Question,
        include: [Option]
      }]
    });

    const availableQuestionnaires = allQuestionnaires.filter(q => !completedQuestionnaires.includes(q.id));

    res.json(availableQuestionnaires);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});



router.get('/user/:id', async (req, res) => {
  try {
    const questionnaire = await Questionnaire.findByPk(req.params.id);
    if (!questionnaire) {
      return res.status(404).send('Questionnaire not found');
    }
    res.json(questionnaire);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.get('/all', async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const questionnairesByWeek = await WeeklyChallenge.findAll({
      where: { userId },
      attributes: ['questionnaireId']
    });

    const completedQuestionnaires = questionnairesByWeek.map(entry => entry.questionnaireId);

    const allQuestionnaires = await Questionnaire.findAll({
      include: [{
        model: Question,
        include: [Option]
      }]
    });

    const availableQuestionnaires = allQuestionnaires.filter(q => !completedQuestionnaires.includes(q.id));

    res.json(availableQuestionnaires);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});


router.get('/getall', async (req, res) => {
  try {
    const questionnaires = await Questionnaire.findAll();
    if (questionnaires.length === 0) {
      return res.status(404).json({ error: 'No questionnaires found' });
    }
    res.json(questionnaires);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/getinformation', async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const questionnairesByWeek = await WeeklyChallenge.findAll({
      where: { userId },
      attributes: ['week', 'year', 'questionnaireId']
    });

    const getCurrentWeek = () => {
      const currentDate = new Date();
      const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
      const pastDaysOfYear = (currentDate - startOfYear) / 86400000;
      return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
    };

    const currentWeek = getCurrentWeek();
    const currentYear = new Date().getFullYear();

    console.log(`Current Week: ${currentWeek}, Current Year: ${currentYear}`);

    const thisWeekQuestionnaires = questionnairesByWeek
      .filter(week => week.week === currentWeek && week.year === currentYear)
      .map(entry => entry.questionnaireId);

    console.log(`This Week's Questionnaires:`, thisWeekQuestionnaires);

    res.json({ score: Math.min(thisWeekQuestionnaires.length, 10) });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

router.get('/answered-per-week', async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    const questionnairesByWeek = await WeeklyChallenge.findAll({
      where: { userId },
      attributes: ['week', 'year', 'questionnaireId']
    });

    const countPerWeek = questionnairesByWeek.reduce((acc, entry) => {
      const weekYear = `${entry.week}-${entry.year}`;
      if (!acc[weekYear]) {
        acc[weekYear] = 0;
      }
      acc[weekYear] += 1;
      return acc;
    }, {});

    res.json(countPerWeek);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Questionnaire = require('../models/Questionnaire');

router.get('/answers', async (req, res) => {
    try {
        const questionnaires = await Questionnaire.find();
        res.json(questionnaires);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/answers2/:id', async (req, res) => {
    try {
        const questionnaire = await Questionnaire.findById(req.params.id);
        if (!questionnaire) {
            return res.status(404).json({ message: 'Questionnaire not found' });
        }
        res.json(questionnaire);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

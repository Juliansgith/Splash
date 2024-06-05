const express = require('express');
const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        let { name, email, city, postcode, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, city, postcode, password });
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY);
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/userdetails/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id, { attributes: ['email', 'points'] });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user details' });
    }
});

module.exports = router;

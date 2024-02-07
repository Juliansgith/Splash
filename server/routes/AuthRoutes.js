const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
      let { name, email, city, postcode, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const user = new User({ name, email, city, postcode, password });
      await user.save();
      res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
      res.status(400).send(error);
    }
  });

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY);
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

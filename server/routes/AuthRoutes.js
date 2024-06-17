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
        const user = await User.findByPk(id, { attributes: ['name', 'email', 'points'] });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user details' });
    }
});

router.put('/update-email', async (req, res) => {
    const { userId, newEmail } = req.body;
  
    if (!newEmail || !userId) {
      return res.status(400).json({ error: 'New email and user ID are required.' });
    }
  
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      user.email = newEmail;
      await user.save();
  
      res.status(200).json({ message: 'Email updated successfully.' });
    } catch (error) {
      console.error('Error updating email:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
  router.put('/update-password', async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;
  
    if (!currentPassword || !newPassword || !userId) {
      return res.status(400).json({ error: 'Current password, new password, and user ID are required.' });
    }
  
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Current password is incorrect.' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
  router.put('/update-name', async (req, res) => {
    const { userId, newName } = req.body;
  
    if (!newName || !userId) {
      return res.status(400).json({ error: 'New name and user ID are required.' });
    }
  
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      user.name = newName;
      await user.save();
  
      res.status(200).json({ message: 'Name updated successfully.' });
    } catch (error) {
      console.error('Error updating name:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  
module.exports = router;

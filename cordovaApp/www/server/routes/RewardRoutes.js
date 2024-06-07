const express = require('express');
const { User } = require('../models/User');
const router = express.Router();

router.get('/points-balance', async (req, res) => {
  const { userId } = req.query; 

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ points: user.points });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user points', error: error.message });
  }
});

router.post('/redeem-rewards', async (req, res) => {
  const { userId, pointsToRedeem } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.points < pointsToRedeem) {
      return res.status(400).json({ message: 'Insufficient points to redeem this reward' });
    }
    
    user.points -= pointsToRedeem;
    await user.save();
    res.json({ message: 'Reward redeemed successfully', newPointsBalance: user.points });
  } catch (error) {
    res.status(500).json({ message: 'Error redeeming rewards', error: error.message });
  }
});

module.exports = router;

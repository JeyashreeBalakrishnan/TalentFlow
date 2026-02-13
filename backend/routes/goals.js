const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// GET all goals for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.params.userId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new goal
router.post('/add', async (req, res) => {
  const newGoal = new Goal(req.body); 
  try {
    const savedGoal = await newGoal.save();
    res.status(201).json(savedGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
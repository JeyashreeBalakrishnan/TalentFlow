const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new skill
// Example Backend POST Route
router.post('/add', async (req, res) => {
  const { name, level, userId } = req.body;
  
  const newSkill = new Skill({
    name,
    level,
    user: userId // Ensure this matches your Schema field name
  });

  try {
    await newSkill.save();
    res.status(201).json(newSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a skill
router.delete('/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: "Skill deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE a skill (proficiency)
router.put('/:id', async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSkill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get skills for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.params.userId }); // Use 'user' to match your schema
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
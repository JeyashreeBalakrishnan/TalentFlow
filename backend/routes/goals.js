const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');

// 1. THIS MUST MATCH THE FRONTEND '.../api/goals/add'
router.post('/add', async (req, res) => {
    try {
        //const { title, description, status } = req.body;
        const { title, description, status, userId, progress, priority, deadline } = req.body;
        const newGoal = new Goal({
            title,
            description,
            status,
            userId, // Save the ID here
            progress,
            priority,
            deadline
        });

        const savedGoal = await newGoal.save();
        res.status(201).json(savedGoal); // Success!
    } catch (err) {
        console.error("Error in /add route:", err);
        res.status(400).json({ message: err.message });
    }
});

// 2. GET route to show goals on Dashboard
// Change your general GET route to this:
router.get('/', async (req, res) => {
    try {
        // If no userId is provided, return an empty array instead of all goals
        const goals = await Goal.find({ userId: req.query.userId || "NOT_FOUND" });
        res.json(goals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a goal
// DELETE a goal by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
        if (!deletedGoal) {
            return res.status(404).json({ message: "Goal not found" });
        }
        res.json({ message: "Goal deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// UPDATE a goal
router.put('/:id', async (req, res) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // This returns the modified document rather than the original
    );
    res.json(updatedGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get goals for the logged-in user only
router.get('/my-goals', async (req, res) => {
  try {
    // We get the ID from the token or a query parameter
    const userId = req.query.userId; 
    const goals = await Goal.find({ userId: userId }); 
    res.json(goals);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// GET goals by User ID
router.get('/user/:userId', async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.params.userId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Example Backend Route
router.patch('/:id', async (req, res) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id, 
      { $set: req.body }, 
      { new: true }
    );
    res.json(updatedGoal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
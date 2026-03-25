const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'Pending' },
  // userId line REMOVED entirely for testing
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  progress: { type: Number, default: 0 },
  priority: { type: String, default: 'Medium' },
  deadline: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Goal', GoalSchema);
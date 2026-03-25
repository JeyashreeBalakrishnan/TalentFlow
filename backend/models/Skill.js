const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Expert'], default: 'Beginner' },
  category: { type: String, default: 'Technical' },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: false 
  }
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'employee'], default: 'employee' },
  // This replaces the "UserSkills" table from the ER diagram
  skills: [{
    name: String,
    level: Number, // 0-100
    category: String
  }]
});

module.exports = mongoose.model('User', UserSchema);
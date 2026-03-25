const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // We will hash this later
  role: { type: String, enum: ['employee', 'admin'], default: 'Employee' }
});

module.exports = mongoose.model('User', UserSchema);
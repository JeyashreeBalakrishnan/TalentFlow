const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send("🚀 API is running perfectly!");
});

// Import Routes
const authRoutes = require('./routes/auth');
const goalRoutes = require('./routes/goals');
const skillRoutes = require('./routes/skills');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/skills', skillRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🔥 MongoDB Connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
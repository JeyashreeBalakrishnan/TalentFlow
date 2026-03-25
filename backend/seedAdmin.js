require('dotenv').config(); // This loads your secret keys
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); 

const seedAdmin = async () => {
  try {
    // USE THE KEY FROM YOUR .ENV FILE
    const dbURI = process.env.MONGO_URI; 
    
    if (!dbURI) {
      console.error("Error: MONGO_URI is not defined in your .env file!");
      process.exit(1);
    }

    await mongoose.connect(dbURI);
    console.log("Connected to Atlas using .env credentials...");

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminUser = new User({
      name: "Admin User",
      email: "admin@talentflow.com",
      password: hashedPassword,
      role: "admin",
      department: "Management"
    });

    await adminUser.save();
    console.log("SUCCESS! Admin created: admin@talentflow.com / admin123");
    process.exit();
  } catch (err) {
    console.error("Still failing! Error details:", err.message);
    process.exit(1);
  }
};

seedAdmin();
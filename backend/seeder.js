// seed.js
const mongoose = require('mongoose');
const User = require('./src/validators-services-routes/user/model');
const jsonData = require('./data/admin.json'); // Load the JSON data

require('./src/dbConnection/mongoDbConnect');
async function seedDatabase() {
  try {
    // Insert the seed data into the collection
    await User.insertMany(jsonData);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection to the database
    mongoose.disconnect();
  }
}

seedDatabase();

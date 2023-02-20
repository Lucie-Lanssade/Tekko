const mongoose = require('mongoose');

require('dotenv/config');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/Tekko';

async function openConnection() {
  try {
    return await mongoose.set('strictQuery', true).connect(MONGO_URI);
  } catch (error) {
    console.error(`Error while connecting to the database: ${error.message}`);
  }
}
module.exports = openConnection;

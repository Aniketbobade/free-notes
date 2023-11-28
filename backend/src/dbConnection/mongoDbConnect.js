const mongoose = require("mongoose");
const config = require("../config/development");

const mongodbConnect= async () => {
  try {
    mongoose.set("strictQuery", false);
    const db = await mongoose.connect(config.MONGO_DB_URL);
    console.log(`\n MongoDB connected !! DB HOST: ${db.connection.host}`);
  } catch (error) {
    console.log("MONGODB connection FAILED ", error);
    process.exit(1)
  }
}

module.exports = mongodbConnect;
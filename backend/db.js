const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI; // Use environment variable

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI); // ✅ No need for extra options
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;

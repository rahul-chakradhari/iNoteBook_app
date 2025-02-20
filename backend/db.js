require("dotenv").config();
const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;

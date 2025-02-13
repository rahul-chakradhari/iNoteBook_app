const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/inotebook"; // Ensure MongoDB is running

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI); // No need for `useNewUrlParser` and `useUnifiedTopology`
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit if connection fails
  }
};

module.exports = connectToMongo;

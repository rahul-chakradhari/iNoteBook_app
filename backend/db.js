const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://<username>:<password>@cluster0.mongodb.net/inotebook?retryWrites=true&w=majority";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI); // ✅ No need for extra options
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
};

module.exports = connectToMongo;

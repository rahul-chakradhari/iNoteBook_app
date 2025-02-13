const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/"; // Ensure MongoDB is running

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected successfully");
  });
};
module.exports = connectToMongo;

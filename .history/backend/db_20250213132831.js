const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/"; // Ensure MongoDB is running

const connectToMongo = async (mongoURI) => {
  clg("connected to mongo sugc");
};
module.exports = connectToMongo;

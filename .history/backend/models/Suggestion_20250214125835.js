const mongoose = require("mongoose");
const { Schema } = mongoose;

const SuggSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true, // Ensure name is mandatory
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  suggestion: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Suggestion", SuggSchema);

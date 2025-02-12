const mongoose = require("mongoose");
const { Schema } = mongoose;

const suggestionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  name: { type: String, required: true },
  emailID: { type: String, required: true },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Track users who liked
});

module.exports = mongoose.model("suggestion", suggestionSchema);

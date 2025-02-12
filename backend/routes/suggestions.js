const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Suggestion = require("../models/Suggestion");
const User = require("../models/User"); // Add this line at the top
// Route to get all suggestions
router.get("/getSuggestions", async (req, res) => {
  try {
    const suggestions = await Suggestion.find(); // Fetch all suggestions from MongoDB
    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to add a new suggestionrouter.post(// Route to add a new suggestionrouter.post(
"/addSuggestion",
  fetchuser,
  [
    body("title", "Title is required").notEmpty(),
    body("description", "Description is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    const user = req.user.id;

    try {
      // Fetch user's name and email
      const userData = await User.findById(user).select("name email");
      if (!userData) {
        return res.status(404).json({ error: "User not found" });
      }

      const newSuggestion = new Suggestion({
        title,
        description,
        name: userData.name,
        emailID: userData.email,
        userID: user,
      });

      const savedSuggestion = await newSuggestion.save();
      res.json(savedSuggestion);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

module.exports = router;

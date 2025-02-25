const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Suggestion = require("../models/Suggestion");
const { body, validationResult } = require("express-validator");

// Route 1: Get all suggestions using GET "api/suggestions/fetchallsuggestions"
router.get("/fetchallsugg", async (req, res) => {
  try {
    const suggestions = await Suggestion.find();
    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route 2: Add a new suggestion using POST "api/suggestions/addsuggestion". Requires login
router.post(
  "/addsugg",
  fetchuser,
  [
    body("suggestion", "Suggestion must be at least 5 characters").isLength({
      min: 5,
    }),
    body("name", "Name is required").notEmpty(), // Validate name
  ],
  async (req, res) => {
    console.log(req.body);
    try {
      const { suggestion, email, name } = req.body;
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const newSuggestion = new Suggestion({
        suggestion,
        email,
        name,
        user: req.user.id,
      });

      const savedSuggestion = await newSuggestion.save();
      res.json(savedSuggestion);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);
// Route 3: Get top suggestions sorted by likes in descending order
// This route will give you the most liked suggestions
router.get("/top-suggestions", async (req, res) => {
  try {
    // Fetch suggestions sorted by likes in descending order
    const topSuggestions = await Suggestion.find()
      .sort({ likes: -1 }) // Sort by likes in descending order
      .limit(10); // Limit to top 10 suggestions (you can adjust this number)

    res.json(topSuggestions); // Return the top suggestions
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// // Route 4: Update an existing suggestion using PUT "api/suggestions/updatesuggestion". Requires login
// router.put("/updatesugg/:id", fetchuser, async (req, res) => {
//   try {
//     const suggestionId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(suggestionId)) {
//       return res.status(400).send("Invalid suggestion ID format");
//     }

//     let suggestion = await Suggestion.findById(suggestionId);
//     if (!suggestion) {
//       return res.status(404).send("Suggestion not found");
//     }

//     if (suggestion.user.toString() !== req.user.id) {
//       return res.status(401).send("Not Allowed");
//     }

//     // Update suggestion fields
//     const updatedFields = {
//       suggestion: req.body.suggestion || suggestion.suggestion,
//     };

//     suggestion = await Suggestion.findByIdAndUpdate(
//       suggestionId,
//       updatedFields,
//       {
//         new: true,
//       }
//     );
//     res.json(suggestion);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Route 5: Delete an existing suggestion using DELETE "api/suggestions/deletesuggestion". Requires login
// router.delete("/deletesugg/:id", fetchuser, async (req, res) => {
//   try {
//     let suggestion = await Suggestion.findById(req.params.id);
//     if (!suggestion) return res.status(404).send("Suggestion not found");

//     if (suggestion.user.toString() !== req.user.id)
//       return res.status(401).send("Not Allowed");

//     suggestion = await Suggestion.findByIdAndDelete(req.params.id);
//     res.json({ result: "Suggestion has been deleted", suggestion });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Route 6: Like a suggestion using PUT "api/suggestions/like/:id". Requires login
// router.put("/like/:id", fetchuser, async (req, res) => {
//   try {
//     const suggestionId = req.params.id;
//     const userEmail = req.user.email; // Assumed that email is available in `req.user`

//     let suggestion = await Suggestion.findById(suggestionId);
//     if (!suggestion) return res.status(404).send("Suggestion not found");

//     // Check if user already liked the suggestion
//     if (suggestion.likedBy.includes(userEmail)) {
//       return res.status(400).send("You have already liked this suggestion");
//     }

//     // Add user to the likedBy array
//     suggestion.likedBy.push(userEmail);

//     // Increment the like count
//     suggestion.likes += 1;

//     suggestion = await Suggestion.findByIdAndUpdate(suggestionId, suggestion, {
//       new: true,
//     });

//     res.json(suggestion);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Route 7: Unlike a suggestion using PUT "api/suggestions/unlike/:id". Requires login
// router.put("/unlike/:id", fetchuser, async (req, res) => {
//   try {
//     const suggestionId = req.params.id;
//     const userEmail = req.user.email; // Assumed that email is available in `req.user`

//     let suggestion = await Suggestion.findById(suggestionId);
//     if (!suggestion) return res.status(404).send("Suggestion not found");

//     // Check if user has liked the suggestion
//     if (!suggestion.likedBy.includes(userEmail)) {
//       return res.status(400).send("You have not liked this suggestion");
//     }

//     // Remove user from the likedBy array
//     suggestion.likedBy = suggestion.likedBy.filter(
//       (email) => email !== userEmail
//     );

//     // Decrement the like count, but ensure it doesn't go below 0
//     suggestion.likes = Math.max(suggestion.likes - 1, 0); // Ensure likes never go below 0

//     suggestion = await Suggestion.findByIdAndUpdate(suggestionId, suggestion, {
//       new: true,
//     });

//     res.json(suggestion);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = router;

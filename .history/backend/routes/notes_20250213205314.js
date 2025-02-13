const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Route 1: Get all notes for the logged-in user using GET "api/notes/fetchallnotes". Requires login
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route 2: Add a new note using POST "api/notes/addnote". Requires login
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, priority } = req.body;

      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        priority,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Route 3: Update an existing note using PUT "api/notes/updatenote". Requires login// Route to update a note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const noteId = req.params.id; // ✅ Correct variable name

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).send("Invalid note ID format");
    }
    console.log("Note ID from URL:", req.params.id);

    let note = await Notes.findById(noteId);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Update note
    note = await Notes.findByIdAndUpdate(
      noteId, // ✅ Corrected variable
      {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
      },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route 4: Delete an existing note using DELETE "api/notes/deletenote". Requires login
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).send("Not found");
    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Not Allowed");

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ result: "Previous note has been deleted", note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

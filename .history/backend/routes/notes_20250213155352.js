const express = require("express");
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

// Route 2: Add a new note using POST "api/notes/addnote". Requires login// Route 2: Add a new note using POST "api/notes/addnote". Requires login
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a proper title name (minimum 5 characters)").isLength({
      min: 5,
    }),
    body(
      "description",
      "Enter a proper description (minimum 5 characters)"
    ).isLength({
      min: 5,
    }),
    body("priority", "Enter a valid priority (LOW/MED/HIGH)").custom(
      (value) => {
        const validPriorities = ["LOW", "MED", "HIGH"];
        if (!validPriorities.includes(value)) {
          throw new Error("Priority must be one of: LOW, MED, HIGH");
        }
        return true;
      }
    ),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, priority, tag } = req.body;

      const note = new Notes({
        title,
        description,
        priority,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Route 3:Update an existing note using POST "api/notes/updatenote". Requires login
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, priority } = req.body;
  try {
    //create a newnote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (priority) {
      newNote.priority = priority;
    }
    //find the note to be update and update it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    //new true means if new contact comes then updated to the database
    note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route 4:Delete an existing note using DELETE "api/notes/deletenote". Requires login
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }
    //deletion only if the node is of that individual user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    //new true means if new contact comes then updated to the database
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ result: "previous note has been deleted", note: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;

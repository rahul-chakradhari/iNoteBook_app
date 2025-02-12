// src/components/AddNote.jsx
import React, { useState } from "react";
import noteContext from "../context/notes/notecontext";
import { useContext } from "react";

const AddNote = ({ showAlert }) => {
  const [note, setNote] = useState({
    title: "",
    description: "",
    priority: "", // Default priority is an empty string
  });
  const context = useContext(noteContext);
  const { addNote } = context;

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (note.title.length < 5 || note.description.length < 5) {
      showAlert("Please fill all fields correctly", "danger");
      return;
    }
    if (
      note.priority !== "LOW" &&
      note.priority !== "MED" &&
      note.priority !== "HIGH"
    ) {
      showAlert("Please select a valid priority", "danger");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/notes/addnote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: note.title,
          description: note.description,
          priority: note.priority,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to add note");
      }

      showAlert("Note added successfully", "success");
      setNote({ title: "", description: "", priority: "" }); // Reset form
    } catch (error) {
      console.error("Error adding note:", error);
      showAlert("Failed to add note", "danger");
    }
  };

  return (
    <div className="container mt-4">
      <h2>
        Add New Notes <i className="fa-solid fa-note-sticky"></i>
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className={`form-control white-border-input`} /* Add the white-border-input class */
            id="title"
            name="title"
            onChange={onChange}
            minLength={5}
            required
            value={note.title}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className={`form-control white-border-input`} /* Add the white-border-input class */
            id="description"
            name="description"
            onChange={onChange}
            minLength={5}
            required
            value={note.description}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            className="form-select"
            id="priority"
            name="priority"
            onChange={onChange}
            value={note.priority}
            required
          >
            <option value="">Select a priority</option>
            <option value="LOW">LOW</option>
            <option value="MED">MED</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;

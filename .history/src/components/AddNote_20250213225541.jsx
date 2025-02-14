import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.priority); // Use priority instead of tag
    setNote({ title: "", description: "", priority: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Dynamically set the button class based on priority
  const getButtonClass = () => {
    switch (note.priority) {
      case "LOW":
        return "btn btn-success"; // Green for low priority
      case "MED":
        return "btn btn-warning"; // Yellow for medium priority
      case "HIGH":
        return "btn btn-danger"; // Red for high priority
      default:
        return "btn btn-primary"; // Default button class
    }
  };

  return (
    <div className="container my-3">
      <h2>
        Add Your Notes <i className="fa-solid fa-notes-medical"></i>
      </h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            className="form-control"
            id="priority"
            name="priority"
            value={note.priority}
            onChange={onChange}
            required
          >
            <option value="">Select Priority</option>
            <option value="LOW">LOW</option>
            <option value="MED">MED</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <button
          disabled={
            note.title.length < 5 ||
            note.description.length < 5 ||
            !note.priority
          }
          type="submit"
          className={getButtonClass()} // Use the dynamic button class
          onClick={handleClick}
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;

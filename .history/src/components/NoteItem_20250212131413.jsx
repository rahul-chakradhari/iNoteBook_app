import React, { useContext } from "react";
import NoteContext from "../context/notes/notecontext";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

const NoteItem = ({ note, updateNote, showAlert }) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  // Function to determine the color based on priority and add white border
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "LOW":
        return "bg-success white-border"; // Green background with white border
      case "MED":
        return "bg-warning white-border"; // Yellow background with white border
      case "HIGH":
        return "bg-danger white-border"; // Red background with white border
      default:
        return "white-border"; // Default to white border only
    }
  };

  const cardClassName = `card m-3 mx-2 g-2 text-center shadow-sm border border-white`;

  return (
    <div className={`col-md-2.5 ${getPriorityColor(note.priority)}`}>
      <div className={cardClassName}>
        <div className="p-3 card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <p className="card-text">Priority: {note.priority}</p>

          <FaTrash
            className="mx-3"
            onClick={() => {
              deleteNote(note._id);  // Correctly calling deleteNote
              showAlert("Note Deleted Successfully", "success");  // Ensuring showAlert is called
            }}
          />

          <FaPencilAlt
            className="mx-3"
            onClick={() => {
              updateNote(note);  // Correctly passing note for updating
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteItem;

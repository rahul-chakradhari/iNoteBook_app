import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  // Set priority class based on the note's priority
  let priorityClass = "";
  switch (note.priority) {
    case "High":
      priorityClass = "text-danger"; // Red for high priority
      break;
    case "Medium":
      priorityClass = "text-warning"; // Yellow for medium priority
      break;
    case "Low":
      priorityClass = "text-success"; // Green for low priority
      break;
    default:
      priorityClass = "";
  }

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="far fa-trash-alt mx-2"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
            <i
              className="far fa-edit mx-2"
              onClick={() => {
                updateNote(note);
              }}
            ></i>
          </div>
          <p className="card-text">{note.description}</p>
          <p className="card-text">Priority: {note.priority}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;

import React, { useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const { deleteNote } = useContext(noteContext);
  const { note, updateNote } = props;

  // State to manage the priority class for the border color
  const [priorityClass, setPriorityClass] = useState("");

  useEffect(() => {
    // Dynamically set priority class based on note.priority
    switch (note.priority.toLowerCase()) {
      case "high":
        setPriorityClass("border-danger"); // Red border for high priority
        break;
      case "medium":
        setPriorityClass("border-warning"); // Yellow border for medium priority
        break;
      case "low":
        setPriorityClass("border-success"); // Green border for low priority
        break;
      default:
        setPriorityClass("border-secondary"); // Default to grey if undefined
    }
  }, [note.priority]); // This effect runs whenever note.priority changes

  return (
    <div className="col-md-3">
      <div className={`card my-3 ${priorityClass} border-thick`}>
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
          <p className="card-text">
            <strong>Priority:</strong> {note.priority}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;

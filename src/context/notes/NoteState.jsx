import React, { useState, useEffect } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // Get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), // Ensure token is saved in localStorage
        },
      });

      const json = await response.json();
      if (response.ok) {
        setNotes(json);
      } else {
        console.error("Failed to fetch notes");
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  // Fetch notes on component mount
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <NoteContext.Provider value={{ notes, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);

  // Get the authentication token
  const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error(
        "Authentication token is missing! User might not be logged in."
      );
      return null;
    }
    return token;
  };

  // Get all Notes
  const getNotes = async () => {
    const token = localStorage.getItem("token"); // ✅ Get token
    console.log("Using Token:", token); // ✅ Check if token is available

    if (!token) {
      console.error("No token found. User is not authenticated.");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/api/notes/fetchallnotes",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token, // ✅ Send token in headers
        },
      }
    );

    const data = await response.json();
    console.log("Notes Response:", data); // ✅ Debugging

    if (response.ok) {
      setNotes(data);
    } else {
      console.error("Failed to fetch notes:", data.error);
    }
  };

  // Add a Note
  const addNote = async (title, description, priority) => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, priority }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const note = await response.json();
      setNotes((prevNotes) => [...prevNotes, note]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Delete a Note
  const deleteNote = async (id) => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Edit a Note
  const editNote = async (id, title, description, priority) => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ title, description, priority }),
      });

      if (!response.ok) {
        throw new Error("Failed to update note");
      }

      const updatedNote = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id
            ? {
                ...note,
                title: updatedNote.title,
                description: updatedNote.description,
                priority: updatedNote.priority,
              }
            : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

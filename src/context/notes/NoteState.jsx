import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  // Get the authentication token
  const getAuthToken = () => {
    const token = localStorage.getItem("authToken");
    if (!token && window.location.pathname !== "/login") {
      console.error("No token found. Redirecting to login...");
      navigate("/login"); // Redirect to login
    }
    return token;
  };

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      getNotes(token); // Fetch notes only if token is available
    }
  }, []);

  // Get all Notes
  const getNotes = async (token) => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (response.status === 401) {
        console.error("Unauthorized! Invalid token. Redirecting to login...");
        localStorage.removeItem("authToken"); // Remove invalid token
        navigate("/login"); // Redirect to login
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }

      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a Note
  const addNote = async (title, description, priority) => {
    const token = getAuthToken();
    if (!token) return;

    try {
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
    const token = getAuthToken();
    if (!token) return;

    try {
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
    const token = getAuthToken();
    if (!token) return;

    try {
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

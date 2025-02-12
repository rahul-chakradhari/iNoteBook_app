import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import noteContext from "../context/notes/notecontext";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, deleteNote } = context;
  let navigate = useNavigate();

  // State for filtering notes by priority
  const [filterPriority, setFilterPriority] = useState("all");

  // State for filtered notes, initializing it as an empty array
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    // Redirect to login if token is not found
    if (!localStorage.getItem("token")) {
      console.log("No token found! Redirecting to /login");
      navigate("/login", { replace: true });
    } else {
      console.log("Token found! Fetching notes...");
      // Fetch notes from backend, send token with API request
      const token = localStorage.getItem("token");
      const fetchNotes = async () => {
        try {
          const response = await fetch(
            "http://localhost:5000/api/notes/fetchallnotes",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (response.status === 401) {
            navigate("/login", { replace: true }); // Redirect if unauthorized
            return;
          }

          const data = await response.json();
          if (response.ok) {
            getNotes(); // Update context with notes data
          } else {
            console.error("Error fetching notes:", data);
          }
        } catch (error) {
          console.error("Error fetching notes:", error);
        }
      };
      fetchNotes();
    }
    // eslint-disable-next-line
  }, [navigate]);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    epriority: "",
  });

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      epriority: currentNote.priority || "",
    });
    ref.current.click();
  };

  const handleClick = () => {
    console.log("Updating the note:", note);
    editNote(note.id, note.etitle, note.edescription, note.epriority);
    refClose.current.click();
    props.showAlert("Note Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleDelete = (id) => {
    deleteNote(id);
    props.showAlert("Note Deleted Successfully", "success");
  };

  const handlePriority = (priority) => {
    setFilterPriority(priority); // Change filter priority
  };

  // Filtering notes based on priority selection
  useEffect(() => {
    if (filterPriority === "all") {
      setFilteredNotes(notes || []); // Ensure it's always an array
    } else {
      const filtered = (notes || []).filter(
        (note) => note.priority.toLowerCase() === filterPriority.toLowerCase()
      );
      setFilteredNotes(filtered);
    }
  }, [notes, filterPriority]);

  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    minLength={5}
                    required
                    value={note.etitle}
                    placeholder="Title (min 5 characters)"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    minLength={5}
                    required
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="epriority" className="form-label">
                    Priority (LOW / MED / HIGH)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="epriority"
                    name="epriority"
                    placeholder={
                      note.epriority ? "" : "Enter LOW, MED, or HIGH"
                    }
                    onChange={onChange}
                    minLength={3}
                    required
                    value={note.epriority}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 ||
                  note.edescription.length < 5 ||
                  note.epriority.length < 3
                }
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>
          Your Saved Notes{" "}
          <i
            className="fa-regular fa-clipboard"
            style={{ cursor: "default" }}
          ></i>
        </h2>

        {/* Priority Dropdown */}
        <Dropdown
          options={["all", "LOW", "MED", "HIGH"]}
          selectedOption={filterPriority}
          handleSelect={handlePriority}
        />

        <div className="row row-cols-5 row-cols-md-5 g-2">
          {filteredNotes.length === 0 ? (
            <p>No Saved notes</p>
          ) : (
            filteredNotes.map((note) => (
              <NoteItem
                key={note._id}
                updateNote={updateNote}
                handleDelete={handleDelete}
                showAlert={props.showAlert}
                note={note}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Notes;

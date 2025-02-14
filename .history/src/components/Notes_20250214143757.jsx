import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "../components/NoteItem";
import AddNote from "./AddNote";
import Dropdown from "./Dropdown"; // Import Dropdown component

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    epriority: "Low",
  });

  const [showModal, setShowModal] = useState(false);
  const [filterPriority, setFilterPriority] = useState("All"); // New state for priority filter

  const updateNote = (currentNote) => {
    setNote({
      id: currentNote._id,
      etitle: currentNote.title || "",
      edescription: currentNote.description || "",
      epriority: currentNote.priority || "Low",
    });
    setShowModal(true);
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.epriority);
    setShowModal(false);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSelect = (selectedPriority) => {
    setNote((prevNote) => ({ ...prevNote, epriority: selectedPriority }));
  };

  const handleFilterChange = (selectedFilter) => {
    setFilterPriority(selectedFilter);
  };

  // Filter notes based on selected priority
  const filteredNotes =
    filterPriority === "All"
      ? notes
      : notes.filter((note) => note.priority === filterPriority);

  return (
    <>
      <AddNote />

      {/* Priority Filter Dropdown */}
      <div className="mb-3">
        <label className="form-label">Filter by Priority:</label>
        <Dropdown
          options={["All", "Low", "Medium", "High"]}
          selectedOption={filterPriority}
          handleSelect={handleFilterChange}
        />
      </div>

      {/* Modal for editing notes */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="false"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="my-3">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="etitle"
                      name="etitle"
                      value={note.etitle}
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
                      id="edescription"
                      name="edescription"
                      value={note.edescription}
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="priority" className="form-label">
                      Priority
                    </label>
                    <Dropdown
                      options={["Low", "Medium", "High"]}
                      selectedOption={note.epriority}
                      handleSelect={handleSelect}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  disabled={
                    note.etitle.length < 5 || note.edescription.length < 5
                  }
                  onClick={handleClick}
                  type="button"
                  className="btn btn-primary"
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display Notes */}
      <div className="row my-3">
        <h2>
          Saved Notes <i className="fa-solid fa-clipboard"></i>
        </h2>
        <h6>
          {" "}
          <i className="fa-solid fa-info"></i>
          Color combination green - for low priority <br />
          yellow - for medium priority <br />
          red - for high priority
        </h6>
        <h6>
          <i className="fa-solid fa-info"></i>
          The by default color of priority is grey , so update the prority to
          see the color effect
        </h6>
        <div className="container mx-2">
          {filteredNotes.length === 0 && "No notes to display"}
        </div>
        {filteredNotes.map((note) => (
          <Noteitem key={note._id} updateNote={updateNote} note={note} />
        ))}
      </div>
    </>
  );
};

export default Notes;

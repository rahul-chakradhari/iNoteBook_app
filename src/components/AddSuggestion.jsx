import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddSuggestion = () => {
  const [title, setTitle] = useState("");
  const [suggestion, setSuggestion] = useState("");

  // Fetch name and email from localStorage
  const userName = localStorage.getItem("userName") || "";
  const emailID = localStorage.getItem("emailID") || "";
  const userID = localStorage.getItem("userID");
  const token = localStorage.getItem("token"); // Ensure token is saved in localStorage

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newSuggestion = {
      title,
      suggestion,
      userName,
      emailID,
      userID,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/suggestions/addSuggestion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token, // Ensure token is sent
          },
          body: JSON.stringify(newSuggestion),
        }
      );

      const data = await response.json();
      if (response.ok) {
        navigate("/suggestions"); // Redirect on success
        showAlert("Suggestion submitted successfully!", "success"); // Optional success alert
      } else {
        alert(data.errors ? data.errors[0].msg : "Something went wrong!");
      }
    } catch (error) {
      console.error("Error adding suggestion:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Display user's name and email (read-only) */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={userName}
            readOnly // Make it read-only
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email ID
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={emailID}
            readOnly // Make it read-only
          />
        </div>

        {/* Title and Suggestion fields */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="suggestion" className="form-label">
            Suggestion
          </label>
          <textarea
            className="form-control"
            id="suggestion"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSuggestion;

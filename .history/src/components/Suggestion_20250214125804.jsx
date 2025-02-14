import React, { useState } from "react";

const Suggestion = ({ onSubmitSuccess }) => {
  const [suggestionData, setSuggestionData] = useState({
    name: "",
    email: "",
    suggestion: "",
  });
  const [alert, setAlert] = useState({ message: "", type: "" }); // Alert state with type

  const handleChange = (e) => {
    setSuggestionData({
      ...suggestionData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !suggestionData.name ||
      !suggestionData.email ||
      !suggestionData.suggestion
    ) {
      setAlert({ message: "All fields are required.", type: "danger" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/sugg/addsugg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: suggestionData.name, // Include name
          email: suggestionData.email,
          suggestion: suggestionData.suggestion,
        }),
      });

      const json = await response.json();

      if (json.success) {
        setAlert({
          message: "Suggestion submitted successfully!",
          type: "success",
        });
        setSuggestionData({ name: "", email: "", suggestion: "" });

        onSubmitSuccess(); // Refresh suggestions

        setTimeout(() => setAlert({ message: "", type: "" }), 3000);
      } else {
        setAlert({
          message: json.error || "Error submitting suggestion.",
          type: "danger",
        });
      }
    } catch (error) {
      setAlert({
        message: "Server error, please try again later.",
        type: "danger",
      });
    }
  };

  return (
    <div className="container my-3">
      {alert.message && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

      <h3>Submit Your Suggestion</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={suggestionData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={suggestionData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="suggestion" className="form-label">
            Suggestion
          </label>
          <textarea
            className="form-control"
            id="suggestion"
            name="suggestion"
            value={suggestionData.suggestion}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Suggestion;

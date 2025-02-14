import React, { useState } from "react";

const Suggestion = () => {
  const [suggestionData, setSuggestionData] = useState({
    name: "",
    email: "",
    suggestion: "",
  });
  const [alert, setAlert] = useState(""); // State to show alerts (success or error)

  // Handle changes in the form fields
  const handleChange = (e) => {
    setSuggestionData({
      ...suggestionData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (
      !suggestionData.name ||
      !suggestionData.email ||
      !suggestionData.suggestion
    ) {
      setAlert("All fields are required.");
      return;
    }

    // Prepare data to send to the backend
    const response = await fetch("http://localhost:5000/api/sugg/addsugg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"), // Ensure token is sent for authentication
      },
      body: JSON.stringify({
        suggestion: suggestionData.suggestion,
        email: suggestionData.email,
      }),
    });

    const json = await response.json();

    if (json.success) {
      // Set success alert
      setAlert("Suggestion submitted successfully!");

      // Reset form fields and trigger alert update
      setSuggestionData({
        name: "",
        email: "",
        suggestion: "",
      });

      // You can also add a timeout to automatically clear the alert after a few seconds:
      setTimeout(() => {
        setAlert("");
      }, 3000); // Clears alert after 3 seconds
    } else {
      setAlert("Successfully submitted suggestion.");
    }
  };

  return (
    <div className="container my-3">
      {/* Show success/error alerts */}
      {alert && <div className="alert alert-info">{alert}</div>}

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

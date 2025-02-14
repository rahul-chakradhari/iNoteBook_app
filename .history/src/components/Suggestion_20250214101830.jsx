import React, { useState, useEffect } from "react";

const Suggestion = () => {
  const [suggestionData, setSuggestionData] = useState({
    suggestion: "", // Only store the suggestion text
  });
  const [alert, setAlert] = useState(""); // State to show alerts (success or error)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    if (isLoggedIn) {
      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email");
      setUserData({ name, email });
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    setSuggestionData({
      ...suggestionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!suggestionData.suggestion) {
      setAlert("Suggestion text is required.");
      return;
    }

    const response = await fetch("http://localhost:5000/api/sugg/addsugg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        suggestion: suggestionData.suggestion,
        email: userData.email,
      }),
    });

    const json = await response.json();

    if (json.success) {
      setAlert("Suggestion submitted successfully!");
      setSuggestionData({ suggestion: "" }); // Reset the suggestion field
      setTimeout(() => {
        setAlert("");
      }, 3000); // Clears alert after 3 seconds
    } else {
      setAlert("Failed to submit suggestion.");
    }
  };

  if (!isLoggedIn) {
    return <div>Please log in to submit a suggestion.</div>;
  }

  return (
    <div className="container my-3">
      {alert && <div className="alert alert-info">{alert}</div>}
      <h3>Submit Your Suggestion</h3>
      <form onSubmit={handleSubmit}>
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

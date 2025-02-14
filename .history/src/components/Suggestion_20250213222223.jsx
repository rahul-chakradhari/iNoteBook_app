import React, { useState } from "react";

const Suggestion = () => {
  const [suggestionData, setSuggestionData] = useState({
    name: "",
    email: "",
    suggestion: "",
  });

  const handleChange = (e) => {
    setSuggestionData({
      ...suggestionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your submission logic here (e.g., make an API call to submit the suggestion)
    console.log(suggestionData);

    // Reset the form after submission
    setSuggestionData({
      name: "",
      email: "",
      suggestion: "",
    });
  };

  return (
    <div>
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

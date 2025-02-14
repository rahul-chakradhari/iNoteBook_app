// In TopSuggestions.jsx
import React, { useState, useEffect } from "react";

const TopSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const response = await fetch("http://localhost:5000/api/sugg/getall");
      const json = await response.json();

      if (json.success) {
        setSuggestions(json.suggestions); // Assuming the response has an array of suggestions
      } else {
        console.error("Failed to fetch suggestions");
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <div className="container my-3">
      <h3>Top Suggestions</h3>
      <div>
        {suggestions.length === 0 ? (
          <p>No suggestions yet!</p>
        ) : (
          suggestions.map((suggestion, index) => (
            <div key={index} className="card my-2">
              <div className="card-body">
                <h5 className="card-title">{suggestion.name}</h5>
                <p className="card-text">{suggestion.suggestion}</p>
                <p className="card-text">
                  <small className="text-muted">
                    Email: {suggestion.email}
                  </small>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Export as default
export default TopSuggestions;

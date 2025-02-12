import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import SuggContext from "../context/sugg/SuggContext";

const Suggestion = () => {
  const { suggestions, fetchSuggestions } = useContext(SuggContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuggestions();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h2>Loading Suggestions...</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Suggestions</h2>

      {suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div key={index} className="card mb-3">
            <h5 className="card-title">{suggestion.title}</h5>
            <p className="card-text">{suggestion.description}</p>
          </div>
        ))
      ) : (
        <p>No suggestions available.</p>
      )}

      {localStorage.getItem("token") && (
        <div className="my-3">
          <Link className="btn btn-primary" to="/add-suggestion">
            Add Suggestion
          </Link>
        </div>
      )}
    </div>
  );
};

export default Suggestion;

import React, { useState, useEffect } from "react";

const TopSuggestions = () => {
  const [topSuggestions, setTopSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTopSuggestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/sugg/top-suggestions"
      );
      const data = await response.json();
      setTopSuggestions(data);
    } catch (error) {
      console.error("Error fetching top suggestions:", error);
      setError("Error fetching top suggestions.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopSuggestions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2>
        Top Suggestions <i className="fa-solid fa-fire"></i>{" "}
      </h2>
      <ul className="list-group">
        {topSuggestions.map((suggestion) => (
          <li key={suggestion._id} className="list-group-item">
            <strong>{suggestion.suggestion}</strong>
            <p>
              <strong>Name:</strong> {suggestion.name}
            </p>{" "}
            {/* Display User's Name */}
            <p>
              <strong>Email:</strong> {suggestion.email}
            </p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSuggestions;

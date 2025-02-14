import React, { useState, useEffect } from "react";

const TopSuggestions = () => {
  const [topSuggestions, setTopSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // To handle errors

  // Function to fetch the top suggestions from the backend
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

  // Fetch top suggestions when the component mounts
  useEffect(() => {
    fetchTopSuggestions();
  }, []);

  // Display loading spinner, error, or suggestions
  if (loading) return <div>Loading...</div>;

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2>Top Suggestions</h2>
      <ul className="list-group">
        {topSuggestions.map((suggestion) => (
          <li key={suggestion._id} className="list-group-item">
            <strong>{suggestion.suggestion}</strong>
            <p>Email: {suggestion.email}</p>

            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSuggestions;

import React, { useState, useEffect } from "react";

const TopSuggestions = () => {
  const [topSuggestions, setTopSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSuggestions = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/suggestions/top-suggestions"
        );
        const data = await response.json();
        setTopSuggestions(data);
      } catch (error) {
        console.error("Error fetching top suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSuggestions();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Top Suggestions</h2>
      <ul>
        {topSuggestions.map((suggestion) => (
          <li key={suggestion._id}>
            <strong>{suggestion.suggestion}</strong>
            <p>Email: {suggestion.email}</p>
            <p>Likes: {suggestion.likes}</p>
            <p>Submitted by: {suggestion.user}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSuggestions;

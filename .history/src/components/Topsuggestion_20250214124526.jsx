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

  // Handle like functionality
  const handleLike = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/suggestions/like/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"), // Ensure authentication
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        // After liking, update the list to reflect the new like count
        setTopSuggestions((prevSuggestions) =>
          prevSuggestions.map((suggestion) =>
            suggestion._id === id
              ? { ...suggestion, likes: suggestion.likes + 1 }
              : suggestion
          )
        );
      } else {
        setError("Failed to like the suggestion.");
      }
    } catch (error) {
      setError("Error liking the suggestion.");
    }
  };

  // Handle unlike functionality
  const handleUnlike = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/suggestions/unlike/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"), // Ensure authentication
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        // After unliking, update the list to reflect the new like count
        setTopSuggestions((prevSuggestions) =>
          prevSuggestions.map((suggestion) =>
            suggestion._id === id
              ? { ...suggestion, likes: suggestion.likes - 1 }
              : suggestion
          )
        );
      } else {
        setError("Failed to unlike the suggestion.");
      }
    } catch (error) {
      setError("Error unliking the suggestion.");
    }
  };

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
            <p>Likes: {suggestion.likes}</p>
            <p>Submitted by: {suggestion.user}</p>

            <button
              onClick={() => handleLike(suggestion._id)}
              className="btn btn-success mx-2"
            >
              Like
            </button>
            <button
              onClick={() => handleUnlike(suggestion._id)}
              className="btn btn-danger"
            >
              Unlike
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSuggestions;

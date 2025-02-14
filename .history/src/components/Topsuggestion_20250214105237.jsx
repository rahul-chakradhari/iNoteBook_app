import React, { useState, useEffect } from "react";

const TopSuggestions = ({ topSuggestions, loading }) => {
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

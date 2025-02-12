import React, { useState, useEffect } from "react";
//importing sugg context so that context api can be used over suggestions
import SuggContext from "./SuggContext";
//const SuggContext = createContext(); // ❌ Defining context inside the same file
const SuggState = ({ children }) => {
  const [suggestions, setSuggestions] = useState([]);

  // ✅ Fetch suggestions from backend
  const fetchSuggestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/suggestions/getSuggestions",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Fetch suggestions when the provider mounts
  useEffect(() => {
    //frst time render hi mount hota hai
    //this ensures that suggestions are fetches immediately when the provider mounts
    fetchSuggestions();
  }, []);

  return (
    <SuggContext.Provider
      value={{ suggestions, setSuggestions, fetchSuggestions }}
    >
      {children}
    </SuggContext.Provider>
  );
};

export default SuggState;

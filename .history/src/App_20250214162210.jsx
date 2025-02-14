import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import { Alert } from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Suggestion from "./components/Suggestion";
import TopSuggestions from "./components/Topsuggestion";

function App() {
  const [topSuggestions, setTopSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Fetch the top suggestions
  const fetchTopSuggestions = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/sugg/top-suggestions"
      );
      const data = await response.json();
      setTopSuggestions(data);
    } catch (error) {
      console.error("Error fetching top suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch top suggestions when the component mounts
  useEffect(() => {
    fetchTopSuggestions();
  }, []);

  // Redirect to home page ("/") on page reload
  useEffect(() => {
    // Automatically redirect to home on reload if not already at home
    if (window.location.pathname !== "/") {
      navigate("/"); // Redirect to home page if not already on home
    }
  }, [navigate]); // Only depends on navigate

  return (
    <NoteState>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/sugg"
            element={<Suggestion onSubmitSuccess={fetchTopSuggestions} />}
          />
          <Route
            path="/top-suggestions"
            element={
              <TopSuggestions
                topSuggestions={topSuggestions}
                loading={loading}
              />
            }
          />
        </Routes>
      </div>
    </NoteState>
  );
}

export default App;

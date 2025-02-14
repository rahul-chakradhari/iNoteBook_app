import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import { Home } from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import { Alert } from "./components/Alert";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Suggestion from "./components/Suggestion";
import TopSuggestions from "./components/TopSuggestions";

function App() {
  const [topSuggestions, setTopSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchTopSuggestions();
  }, []);

  return (
    <NoteState>
      <Router>
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
      </Router>
    </NoteState>
  );
}

export default App;

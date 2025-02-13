import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/About.jsx";
import "./App.css";
import NavBar from "./components/NavBar.jsx";
import Home from "./components/Home.jsx";
import NoteState from "../src/context/notes/NoteState.jsx";
import Alert from "./components/Alert.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Suggestion from "./components/Suggestion.jsx";
import SuggState from "./context/sugg/SuggState.jsx";
import AddSuggestion from "./components/AddSuggestion.jsx";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    console.log("showAlert called with:", message, type); // Debug log

    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      console.log("Hiding alert"); // Debug log
      setAlert(null);
    }, 3000);
  };

  return (
    <NoteState>
      <SuggState>
        <Router>
          <NavBar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/about" element={<About />} />
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
              <Route
                exact
                path="/suggestions"
                element={<Suggestion showAlert={showAlert} />}
              />
              <Route
                exact
                path="/add-suggestion"
                element={<AddSuggestion showAlert={showAlert} />}
              />
            </Routes>
          </div>
        </Router>
      </SuggState>
    </NoteState>
  );
}

export default App;

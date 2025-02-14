import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />

          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/sugg" element={<Suggestion />} />
              <Route path="/top-suggestions" component={TopSuggestions} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;

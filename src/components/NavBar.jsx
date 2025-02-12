import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SuggContext from "../context/sugg/SuggContext"; // Importing context

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { suggestions } = useContext(SuggContext); // Accessing global suggestions

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          iNoteBook <i className="fa-sharp fa-solid fa-book"></i>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>

            {/* Show suggestions link for everyone */}
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/suggestions" ? "active" : ""
                }`}
                to="/suggestions"
              >
                Suggestions ({suggestions.length}){" "}
                {/* Show the number of suggestions */}
              </Link>
            </li>

            {/* Show "Add Suggestion" link only for logged-in users */}
            {localStorage.getItem("token") && (
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/add-suggestion" ? "active" : ""
                  }`}
                  to="/add-suggestion"
                >
                  Add Suggestion
                </Link>
              </li>
            )}
          </ul>

          <form className="d-flex" role="search">
            {localStorage.getItem("token") ? (
              <button className="btn btn-danger mx-1" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <Link className="btn btn-primary mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary mx-1" to="/signup">
                  Signup
                </Link>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Suggestion = ({ onSubmitSuccess }) => {
  const navigate = useNavigate();
  const [suggestionData, setSuggestionData] = useState({
    name: "",
    email: "",
    suggestion: "",
  });
  const [alert, setAlert] = useState({ message: "", type: "" });

  // Check if the user is logged in (token exists in localStorage)
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      // If token is not present, redirect to login page
      navigate("/login", { replace: true });
    }
  }, [navigate]); // Run effect only on component mount

  const handleChange = (e) => {
    setSuggestionData({
      ...suggestionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !suggestionData.name ||
      !suggestionData.email ||
      !suggestionData.suggestion
    ) {
      setAlert({ message: "All fields are required.", type: "danger" });
      return;
    }

    try {
      console.log(suggestionData);
      const response = await fetch(
        "http:/localhost:5000/api/auth/createuser//api/sugg/addsugg",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({
            name: suggestionData.name,
            email: suggestionData.email,
            suggestion: suggestionData.suggestion,
          }),
        }
      );
      console.log("Token:", localStorage.getItem("token"));

      const json = await response.json();

      if (json.success) {
        setAlert({
          message:
            "Your suggestion has been successfully submitted. Thank you for your input!",
          type: "success",
        });
        setSuggestionData({ name: "", email: "", suggestion: "" });
        onSubmitSuccess();
        setTimeout(() => setAlert({ message: "", type: "" }), 3000);
      } else {
        setAlert({
          message:
            json.message || "Suggestion had been stored Successfully ...",
          type: "success",
        });
      }
    } catch (error) {
      setAlert({
        message:
          "Sorry, we couldn't process your suggestion at this time. Please try again later.",
        type: "danger",
      });
    }
  };

  return (
    <div className="container my-3">
      {alert.message && (
        <div className={`alert alert-${alert.type}`} role="alert">
          {alert.message}
        </div>
      )}

      <h3>
        Submit Your Suggestions <i className="fa-solid fa-folder-open"></i>{" "}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={suggestionData.name}
            onChange={handleChange}
            required
            placeholder="Minimum length of 5 characters"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={suggestionData.email}
            onChange={handleChange}
            required
            placeholder="finish with  @gmail.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="suggestion" className="form-label">
            Suggestion
          </label>
          <textarea
            className="form-control"
            id="suggestion"
            name="suggestion"
            value={suggestionData.suggestion}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Suggestion;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State to show success message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error before making the request

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
        }),
      });

      const json = await response.json();
      console.log(json); // Log the server response

      setLoading(false);

      if (response.ok) {
        // If the signup is successful, save the token in localStorage
        localStorage.setItem("authToken", json.token); // Assuming your API returns a token in `json.token`

        // Show success alert
        setSuccessMessage("Welcome to iNotebook! Your journey begins now...");

        // Wait for 1 second before redirecting
        setTimeout(() => {
          setSuccessMessage(""); // Clear the success message
          navigate("/"); // Redirect to the home page after 1 second
        }, 1000); // 1 second delay
      } else {
        // If response is not ok, show error message
        setError(json.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
      console.error("Error during signup:", err);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      {/* Show success alert */}
      {successMessage && (
        <div className="alert alert-success mt-3">{successMessage}</div>
      )}
      {/* Show error alert */}
      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <h2>
        Signup <i className="fa-solid fa-user-plus"></i>
      </h2>
      <br />
      <h6>
        <i>
          * If logged in user then go to login page <br />
        </i>
        * Name should be at least 5 characters length <br />
        * Password should be at least 8 characters length <br />* Email is
        unique
      </h6>
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
            value={user.name}
            onChange={onChange}
            required
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
            value={user.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={user.password}
            onChange={onChange}
            required
            minLength={8}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Signing up..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Signup;

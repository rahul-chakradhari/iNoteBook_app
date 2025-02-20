import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(""); // Error alert state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(""); // Reset error before making request

    try {
      const response = await fetch(
        "https://inotebook-app-7-19uj.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }
      );

      const data = await response.json();
      setLoading(false);

      if (response.ok && data.success && data.authtoken) {
        // Store the token
        localStorage.setItem("token", data.authtoken);

        // Show success message
        setSuccessMessage("Welcome back! Redirecting you to your dashboard...");

        // Redirect after 1 second
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/");
        }, 1000);
      } else {
        setAlert(data.error || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setAlert("An error occurred. Please try again later.");
      console.error("Error during login:", err);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3">
      {/* Show success message */}
      {successMessage && (
        <div className="alert alert-success mt-3">{successMessage}</div>
      )}

      {/* Show error alert */}
      {alert && <div className="alert alert-danger mt-3">{alert}</div>}

      <h2>
        Login <i className="fa-solid fa-address-card"></i>{" "}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
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
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;

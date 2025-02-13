import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data:", credentials);
    try {
      const { name, email, password } = credentials;

      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const json = await response.json();
      console.log("Server Response:", json);
      if (json.success) {
        // Save auth token and redirect
        localStorage.setItem("token", json.authtoken);
        console.log("Alert function called:", props.showAlert);
        props.showAlert("Account Created Successfully", "success");

        setTimeout(() => {
          navigate("/");
        }, 500);
      } else {
        props.showAlert(
          "Invalid credentials or account is logged in already",
          "danger"
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Failed to connect to the server. Check your network.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h2>
        Signup to iNoteBook <i className="fa-sharp fa-solid fa-book"></i>
      </h2>
      <h6 className="my-2">
        <i className="cursive">
          where your notes safety is <s>your</s> our priority
        </i>
      </h6>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="name"
            required
            minLength={5}
            onChange={onChange}
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
            required
            aria-describedby="emailHelp"
            onChange={onChange}
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
            required
            minLength={8}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            required
            minLength={8}
            className="form-control"
            id="cpassword"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;

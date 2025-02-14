import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notes from "./Notes";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token is available in localStorage (i.e., user is logged in)
    if (!localStorage.getItem("token")) {
      // If token is not present, redirect to login page
      navigate("/login", { replace: true });
    }
  }, [navigate]); // Empty array ensures this effect runs once when the component mounts

  return (
    <div>
      <Notes />
    </div>
  );
};

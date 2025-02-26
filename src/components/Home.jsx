import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notes from "./Notes";

export const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.warn("No token found! Redirecting to login...");
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      <Notes />
    </div>
  );
};

import React from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }
  return (
    <div className=" w-screen h-screen bg-zinc-900">
      <Navbar />
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getTimeElapsed } from "../constants/index.js";

const Home = () => {
  const { user, login } = useAuth();
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/project");
        setProjects(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);
  return (
    <div className=" w-screen h-screen bg-zinc-900  pt-[70px] text-white">
      <Navbar />
      <div className=" flex justify-center items-center">
        <button className=" bg-transparent border p-5 rounded-xl flex justify-center items-center gap-4">
          Create New Project
        </button>
      </div>
      <div className=" w-screen p-[6vw]">
        <h2 className=" text-xl font-bold">
          {projects.map((project) => {
            return (
              <Link to={`/workspace/${project._id}`}>
                <div className=" border-b border-t border-zinc-800  p-4 flex justify-between items-center">
                  <h3>{project?.document?.title}</h3>
                  <span className=" text-sm font-thin">{`${getTimeElapsed(
                    project.document.createdAt
                  )}`}</span>
                </div>
              </Link>
            );
          })}
        </h2>
      </div>
    </div>
  );
};

export default Home;

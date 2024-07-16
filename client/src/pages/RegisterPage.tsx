import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();

  console.log(user);

  if (user != null) {
    navigate("/");
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        {
          name,
          email,
          password,
        }
      );
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex w-screen h-screen bg-zinc-900 justify-center items-center text-white">
      <div className=" flex flex-col gap-10 justify-center  items-center">
        <h1>Register</h1>
        <form
          onSubmit={handleRegister}
          className=" flex justify-center flex-col gap-5 bg-white p-10 rounded-3xl text-black"
        >
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            className=" outline-none"
          />
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className=" outline-none"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className=" outline-none"
          />
          <button
            type="submit"
            className=" bg-zinc-900 p-2 rounded-xl text-white"
          >
            Register
          </button>
          <p className=" text-zinc-500">
            Already have an account?{" "}
            <Link to="/login">
              <span className=" text-blue-500">Login</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

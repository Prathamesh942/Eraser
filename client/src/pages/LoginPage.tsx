import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useAuth();
  const navigate = useNavigate();

  console.log(user);

  if (user != null) {
    navigate("/");
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className=" flex w-screen h-screen bg-zinc-900 justify-center items-center text-white">
      <div className=" flex flex-col gap-10 justify-center  items-center">
        <h1>Login</h1>
        <form
          onSubmit={handleLogin}
          className=" flex justify-center flex-col gap-5 bg-white p-10 rounded-3xl text-black"
        >
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
            Login
          </button>
          <p className=" text-zinc-500">
            Don't have an account?{" "}
            <Link to="/register">
              <span className=" text-blue-500">Register</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

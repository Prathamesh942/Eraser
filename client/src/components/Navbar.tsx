import React, { useEffect } from "react";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const { user, logout, login } = useAuth();
  console.log(user);
  useEffect(() => {}, [user]);
  return (
    <div className=" w-screen bg-zinc-800 absolute top-0 flex justify-between px-[6vw] text-white  h-[50px] items-center border-b border-zinc-500 bg-transparent">
      <div>LOGO</div>
      <div className=" flex gap-5">
        {user && (
          <span className=" w-8 h-8 bg-white text-black rounded-full flex justify-center items-center font-bold text-xl">
            {user?.user?.name[0].toUpperCase()}
          </span>
        )}
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button>Login</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

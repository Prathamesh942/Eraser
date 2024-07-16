import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Navbar from "../components/Navbar";

const Workspace: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="bg-zinc-900 w-screen h-screen pt-[70px] text-white">
      <Navbar />
      <div className="h-full w-screen px-[6vw]">
        <div className="w-full h-full px-[20%]">
          <div className="w-full h-full py-[50px] flex flex-col gap-10">
            <div className=" flex items-center justify-between">
              <input
                className=" bg-transparent text-white text-3xl outline-none"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <button className=" bg-white text-black rounded-lg p-2">
                Save
              </button>
            </div>

            <textarea
              className="flex-grow p-2 bg-transparent text-white rounded-md focus:outline-none focus:border-zinc-500 "
              value={content}
              onChange={handleChange}
              placeholder="Type your notes or document here "
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;

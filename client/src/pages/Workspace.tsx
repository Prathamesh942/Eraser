import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const Workspace: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [docId, setDocId] = useState();
  const [savedStatus, setSavedStatus] = useState("save");
  const projectId = useParams().projectId;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8000/api/v1/project/update/${docId}`, {
        title,
        content,
      });
      setSavedStatus("saved");
      setTimeout(() => {
        setSavedStatus("save");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/v1/project/${projectId}`
        );
        console.log(res.data);
        setTitle(res.data.data.document.title);
        setContent(res.data.data.document.content);
        setDocId(res.data.data.document._id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
    console.log(title);
  }, []);

  return (
    <div className="bg-zinc-900 w-screen h-screen pt-[70px] text-white">
      <Navbar />
      <div className="  absolute top-0 h-[50px] left-[50%] translate-x-[-50%] flex justify-between items-center">
        <div className=" flex border  rounded-sm text-sm font-medium">
          <button className=" border-r px-2 py-1">Document</button>
          <button className=" border-r px-2 py-1">Both</button>
          <button className=" px-2 py-1">Canvas</button>
        </div>
      </div>
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
              <button
                onClick={handleSave}
                className=" rounded-lg bg-transparent"
              >
                {savedStatus}
              </button>
            </div>

            <textarea
              className="flex-grow  bg-transparent text-white rounded-md focus:outline-none focus:border-zinc-500 "
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

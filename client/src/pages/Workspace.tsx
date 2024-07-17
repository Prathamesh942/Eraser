import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Invite from "../components/Invite";
import { useAuth } from "../AuthContext";
import { io } from "socket.io-client";
import { useSocket } from "../SocketContext";

const socket = io("http://localhost:8000");

const Workspace: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [docId, setDocId] = useState();
  const [invitees, setInvitees] = useState([]);
  const [savedStatus, setSavedStatus] = useState("save");
  const [amICollaborator, setAmICollaborator] = useState(true);
  const [usersInRoom, setUsersInRoom] = useState([]);

  const projectId = useParams().projectId;

  const { user } = useAuth();

  socket.on("content", (content) => {
    setContent(content);
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setContent(e.target.value);
    socket.emit("content", { documentId: docId, content: e.target.value });
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
  console.log(invitees);

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
        setInvitees(res.data.data.collaborator);
        setAmICollaborator(false);
        for (let colllab of res.data.data.collaborator) {
          if (colllab._id == user.user._id) {
            setAmICollaborator(true);
          }
        }
        if (res.data.data.owner == user.user._id) setAmICollaborator(true);
        socket.emit("join document", {
          documentId: res.data.data.document._id,
          userId: user.user._id,
        });
        socket.on("user joined", (usersInRoom) => {
          console.log(usersInRoom);
          setUsersInRoom(usersInRoom);
          console.log(usersInRoom);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProject();
    //joining the room
  }, []);

  return (
    <div className="bg-zinc-900 w-screen h-screen pt-[70px] text-white">
      <div className="  absolute top-0 h-[50px] left-[50%] translate-x-[-50%] flex justify-between items-center bg-zinc-800 w-screen px-[6vw]">
        <Link to={"/"}>
          <div>
            <img
              src="/assets/logocollab.png"
              alt=""
              className=" w-10 object-cover"
            />
          </div>
        </Link>

        <div className=" flex border  rounded-sm text-sm font-medium">
          <button className=" border-r px-2 py-1">Document</button>
          <button className=" border-r px-2 py-1">Both</button>
          <button className=" px-2 py-1">Canvas</button>
        </div>
        <div className=" flex gap-6 justify-center items-center">
          <div className=" flex">
            {usersInRoom.map((user) => {
              return (
                <div className=" bg-green-400 w-8 h-8 rounded-full flex justify-center items-center shadow-lg">
                  {user.name[0]}
                </div>
              );
            })}
          </div>
          {amICollaborator && (
            <Invite projectId={projectId} collaborator={invitees} />
          )}
        </div>
      </div>
      <div className="h-full w-screen px-[6vw]">
        <div className=" absolute right-[6vw]"></div>
        <div className="w-full h-full px-[20%]">
          <div className="w-full h-full py-[50px] flex flex-col gap-10">
            {!amICollaborator && (
              <div className=" w-[100%] flex justify-center bg-red-400 rounded-lg p-2">
                Only collaborators added by owner can edit this project !
              </div>
            )}
            <div className=" flex items-center justify-between">
              <input
                className=" bg-transparent text-white text-3xl outline-none"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                disabled={!amICollaborator}
              />
              {amICollaborator && (
                <button
                  onClick={handleSave}
                  className=" rounded-lg bg-transparent"
                >
                  {savedStatus}
                </button>
              )}
            </div>

            <textarea
              className="flex-grow  bg-transparent text-white rounded-md focus:outline-none focus:border-zinc-500 "
              value={content}
              onChange={handleContentChange}
              placeholder="Type your notes or document here "
              disabled={!amICollaborator}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;

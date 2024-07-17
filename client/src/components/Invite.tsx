import axios from "axios";
import React, { useEffect, useState } from "react";

const Invite = ({ projectId, collaborator = [] }) => {
  const [open, setOpen] = useState(false);
  const [invitees, setInvitees] = useState(collaborator);
  const [user, setUser] = useState("");
  const [exists, setExists] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (user) {
      const debounceTimeout = setTimeout(async () => {
        try {
          console.log(user);

          const res = await axios.get(
            `http://localhost:8000/api/v1/users/search/${user}`
          );
          console.log("hii");

          console.log("User data:", res.data.data);

          if (res?.data?.data.length) {
            setUserId(res.data.data[0]._id);
            setExists(true);
            console.log(exists);
          } else {
            setExists(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setExists(false);
        }
      }, 300); // 300ms debounce time

      return () => clearTimeout(debounceTimeout);
    } else {
      setExists(false);
    }
  }, [user]);

  const addCollab = async () => {
    console.log(projectId, userId);
    for (let collab of collaborator) {
      if (collab.email == user) {
        setUser("");
        return;
      }
    }

    try {
      await axios.post(
        `http://localhost:8000/api/v1/project/addcollaborator/${projectId}/${userId}`
      );
      collaborator.unshift({ email: user });
      setUser("");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(collaborator);

  return (
    <div className="relative">
      <button
        className="bg-blue-500 text-white p-2 flex justify-center items-center rounded-md"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Invite
      </button>
      {open && (
        <div className="flex flex-col gap-4 absolute right-0 p-8 shadow-xl border rounded-lg bg-zinc-900 my-2 border-zinc-500">
          <h2 className="text-xl font-bold">Invite</h2>
          <div className="p-2 border border-zinc-800 rounded-md flex">
            <input
              type="text"
              placeholder="Email address"
              className="bg-transparent outline-none"
              value={user}
              onChange={(e) => {
                setUser(e.target.value);
              }}
            />
            <button
              className={`${
                exists ? "bg-blue-400" : "bg-zinc-800"
              } p-2 rounded-md `}
              disabled={!exists}
              onClick={addCollab}
            >
              Invite
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {collaborator.map((collab) => {
              return <div>{collab.email}</div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Invite;

import React, { createContext, useContext } from "react";
import io, { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext)!;
};

export const SocketProvider: React.FC = ({ children }) => {
  const socket = io("http://localhost:8000");

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

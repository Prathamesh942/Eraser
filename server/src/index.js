import { Socket } from "dgram";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { log } from "console";
import { User } from "./models/user.model.js";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

dotenv.config({
  path: "./.env",
});

const roomMap = {};

connectDB()
  .then(() => {
    io.on("connection", (socket) => {
      console.log("user connected");

      socket.on("join document", async ({ documentId, userId }) => {
        socket.join(documentId);
        try {
          const user = await User.findById(userId);
          user.socketId = socket.id;

          if (!user) {
            console.error(`User not found for ID: ${userId}`);
            return;
          }

          if (!roomMap[documentId]) {
            roomMap[documentId] = new Set();
          }

          let userAlreadyInRoom = false;
          for (let existingUser of roomMap[documentId]) {
            if (existingUser._id.equals(user._id)) {
              userAlreadyInRoom = true;
              break;
            }
          }

          if (!userAlreadyInRoom) {
            roomMap[documentId].add(user);
            io.to(documentId).emit(
              "user joined",
              Array.from(roomMap[documentId])
            );
          } else {
            io.to(documentId).emit(
              "user joined",
              Array.from(roomMap[documentId])
            );
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      });

      socket.on("disconnecting", () => {
        Object.keys(roomMap).forEach((docId) => {
          roomMap[docId].forEach((user, socketId) => {
            console.log(user.socketId, socket.id);
            if (user.socketId === socket.id) {
              roomMap[docId].delete(socketId);
              socket.to(docId).emit("user joined", Array.from(roomMap[docId]));
              console.log(
                "Remaining users in document:",
                Array.from(roomMap[docId])
              );
              return;
            }
          });
        });
      });

      socket.on("title", (title) => {
        io.emit("title", title);
      });

      socket.on("content", ({ documentId, content }) => {
        socket.to(documentId).emit("content", content);
      });
    });
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!!", err);
  });

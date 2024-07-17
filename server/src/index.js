import { Socket } from "dgram";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { log } from "console";

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

connectDB()
  .then(() => {
    io.on("connection", (socket) => {
      console.log("user connected");

      socket.on("join document", async (documentId) => {
        socket.join(documentId);
        socket.to(documentId).emit("User joined");
        console.log("doc id is", documentId);
      });

      socket.on("title", (title) => {
        io.emit("title", title);
      });

      socket.on("content", ({ documentId, content }) => {
        socket.to(documentId).emit("content", content);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!!", err);
  });

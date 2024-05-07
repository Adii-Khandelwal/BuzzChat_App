import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from "./routes/userRoutes.js"; 
import messageRoutes from "./routes/messageRoutes.js";
const app=express();
import {Server} from "socket.io";
import dotenv from 'dotenv';
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoutes);


mongoose.connect("mongodb+srv://adii-khandelwal:qwerty01@cluster0.yqsmzuf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
    dbName:"Buzz-chat",
})
.then(()=> {
    console.log("DB Connection Successful");})
.catch((err)=>{
console.log(err.message);
})

const server=app.listen(process.env.PORT, ()=>{
    console.log(`server started running on Port ${process.env.PORT}`);
});

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});


global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-receive", data.message);
      }
    });
  });
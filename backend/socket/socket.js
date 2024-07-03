//note that there is SocketContext.jsx file after this in the context folder for frontend

import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin :["http://localhost:5173"],
        methods:["GET","POST"]
    }
})

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {} //{userId :socketId}

io.on("connection",(socket)=>{ //basically the socket keyword here is the user themselves. It has many properties like IDs. by the way mostly we use this for getting IDs
    console.log("a user connected",socket.id);

    const userId = socket.handshake.query.userId;// this is the same userId from the 17th line of SocketContext.js in frontend src/context folder
    if(userId !="undefined") userSocketMap[userId] = socket.id;

    //io.emit() is used to send events to all the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap)); // when a user connects it immediately tells whether who is online and who is offline

    //socket.on() is used to listen to the events. Can be used both on client and server side
    socket.on("disconnect",() => {
        console.log("user disconnected",socket.id);
        delete userSocketMap[userId]; //it deletes the disconnected one and the line below tells every client about it (i.e a green stuff will be there above the profilePic of the user).
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})
export { app,io,server }
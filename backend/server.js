//module imports
import path from "path"
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";

//file imports
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app,server } from "./socket/socket.js";

//const app = express(); 
//We commented out the line above and put it in socket.io file. the reason is given below.
//say if two users want to chat (also both of them are logged in) and one of them send a message to the other. This message then goes through express and then in turn sent to the server from express.
//but the problem is the update in the server is known to the other user only if he/she refreshes their page. This is not real time communication and needs to be made one.
//therefore socket.io has to encapsulate the express application for it to be real time communication
//Note that we have imported app from socket.js and defined "app" as express application in the socket.js file

const port = process.env.PORT || 5000;

const __dirname = path.resolve() //this gives absolute path to the root folder //check 36th line. This line is brought for deployment stuff

dotenv.config();

app.use(express.json()); //to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser())

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//36-43 is for deployment purpose
app.use(express.static(path.join(__dirname,"/frontend/dist")));//basically the express.static makes every files static. 
                                                                    //And __dirname is the root directory.
                                                                    //what we did here is ,this will go to dist folder, which is not here for me but in the server 
                                                                    //it will be made. so say if someone else takes our application, then if execute the 
                                                                    //command "npm run build", vite installs everything in the frontend automatically
app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname,"frontend","dist","index.html")) //with this we are able to run our frontend in the server port as well i.e localhost:3000 for me
})
//36-43 is for deployment purpose. Also line 7 and 9 of package.json of backend (which is in the root) was introduced for deployment purpose. Have a look.

 app.get("/test",(req,res)=>{
    res.send("Test Route!")
})

//app.listen( port , () => {
server.listen( port , () => {//server from socket.io
    connectToMongoDB(port);
    console.log(`Server running on port ${port}`);
})
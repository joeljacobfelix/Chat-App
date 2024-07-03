//did the command "npm i socket.io-client" for this file
import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext(); //remember the useContext hook. yeah createContext is used for it.

export const useSocketContext = () => {
    return useContext(SocketContext);//useContext() = React Hook allows you to share values between multiple levels of components without passing props through each level
}

export const SocketContextProvider = ({ children }) => {
    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const { authUser } =  useAuthContext()

    useEffect(() => {
        if (authUser){
            const socket = io("http://localhost:3000",{
                query: {
                    userId: authUser._id, // sends to the backend
                }
            });

            setSocket(socket);

            //socket.on() is used to listen to the events. Can be used both on client and server side
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            })
            return () => socket.close(); //This line is introduced for performance optimisation. It closes the socket connection when it is unmounted.
        } else {
            if (socket){
                socket.close();
                setSocket(null);
            }
        }
    },[authUser]);

    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children} 
        </SocketContext.Provider>
    )
} 
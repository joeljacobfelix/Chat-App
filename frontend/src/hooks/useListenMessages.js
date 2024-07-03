import { useEffect } from 'react'

import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/useConversation"

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages,setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage",(newMessage) => {
            setMessages([...messages, newMessage]);//listener also gets to know about the message
        });

        return () => socket?.off("newMessage");//this line is necessary because the socket functionality here listens multiple newMessages constantly and we dont want that to happen multiple time. i guess so. not sure
    }, [socket, setMessages, messages])
}

export default useListenMessages;

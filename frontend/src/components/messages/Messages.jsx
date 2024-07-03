import Message from "./Message"
import useGetMessages from "../../hooks/useGetMessages"
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx"
import { useEffect,useRef } from "react"
import useListenMessages from "../../hooks/useListenMessages.js"

const Messages = () => {
  const {messages, loading } = useGetMessages();
  useListenMessages()
  //Note that the lines or functions where i mention "//--" is either created or updated to bring the functionality of scrolling automatically when ever new messages come
  const lastMessageRef = useRef(); //--
  
  useEffect(()=>{//-- entire function
    setTimeout(() => {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth"});
    },100)
  },[messages]);
  console.log(messages)
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages.length > 0 && messages.map((messages) => (
        <div key={messages._id}//-- 
          ref={lastMessageRef}
        >
          <Message  message={messages} />
        </div>
      ))}

      {loading && [...Array(3)].map((_,idx) => <MessageSkeleton key={idx} /> )}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  )
}

export default Messages

import useConversation from "../../zustand/useConversation"
import { useSocketContext } from "../../context/SocketContext";
const Conversation = ({conversation,lastIdx}) => {
    const {selectedConversation, setSelectedConversation} = useConversation()
    
    const isSelected = selectedConversation?._id === conversation._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id)
    return (
        <div>
            <div 
                className={`flex gap-2 items-center hover:bg-sky-700 rounded p-2 py-1 cursor-pointer
                ${isSelected ? "bg-sky-500" : ""}
                `}
                onClick={() =>{setSelectedConversation(conversation)}}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img src={conversation.profilePic} alt="user avatar"/>
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">{conversation.fullname}</p>
                        {/* <span className="text-xl">😀</span> */}
                    </div>
                </div>
            </div>

            { !lastIdx && <div className="divider my-0 py-0 h-1"/>}
        </div>
    )
}

export default Conversation

//starter code
/* 
const Conversation = () => {
  return (
    <div>
        <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
            <div className="avatar online">
                <div className="w-12 rounded-full">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><g id="about"><path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z"/><path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z"/></g></svg>
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <div className="flex gap-3 justify-between">
                    <p className="font-bold text-gray-200">John Doe</p>
                    <span className="text-xl">😀</span>
                </div>
            </div>
        </div>

        <div className="divider my-0 py-0 h-1"/>
    </div>
  )
}

export default Conversation
*/
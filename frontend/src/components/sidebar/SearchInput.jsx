import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import useConversation from "../../zustand/useConversation"
import useGetConversations from "../../hooks/useGetConversations"

const SearchInput = () => {
  const [search, setSearch] = useState();
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    if (search.length < 3){
      return toast.error("Search term must be atleast 3 characters long");
    }

    const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()));

    if (conversation){
      setSelectedConversation(conversation)
      setSearch("");
    } else toast.error(`No user found`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input type="text" placeholder="Search..." className="input input-bordered rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
            <FaSearch className="w-6 h-6 outline-none" />
        </button>
    </form>
  )
}

export default SearchInput

//starter code
/* 
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  return (
    <form className="flex items-center gap-2">
        <input type="text" placeholder="Search..." className="input input-bordered rounded-full" />
        <button type="submit" className="btn btn-circle bg-sky-500 text-white">
            <FaSearch className="w-6 h-6 outline-none" />
        </button>
    </form>
  )
}

export default SearchInput
 */
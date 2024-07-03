import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const login = async(username, password) =>{
        const success = handleInputErrors(username, password);
        if (!success) return;

        setLoading(true);
        try{
            const res = await fetch("/api/auth/login",{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({username, password})
            })
        
            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }

            localStorage.setItem("chat-user", JSON.stringify(data))
            setAuthUser(data)
        }
        catch(error){
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
      }

    return {loading,login}
}

export default useLogin

//the below function is a bit reduntant, because we have similar function in useSignup.js. but you know i am lazy and i will just copy paste
function handleInputErrors(username, password){
    if (!username || !password ){
        toast.error("Please fill in all the fields");//toast.error is from the react-hot-toast
        return false
    }

    return true
}

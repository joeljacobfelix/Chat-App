import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext(); //from /context/AuthContext.jsx

    const signup = async({fullname, username, password, confirmPassword, gender}) => {
        const success = handleInputErrors({fullname, username, password, confirmPassword, gender}); //function handleInputError defined below
        if(!success) return;

        setLoading(true);
        try{
            const res = await fetch("/api/auth/signup" , { //actually it should be http://localhost:3000/api/auth/signup. but in vite.config.js we have added the nested object "server", which inturn has "proxy" object in it. please refer. fun fact you can run your client application in any port as your wish if you mention "port" and the port number inside this "server" object
                method: "POST",
                headers: {"Content-Type":"application/json"}, //This is included in the request headers to inform the server that the data being sent is in JSON format.
                body: JSON.stringify({fullname, username, password, confirmPassword, gender})
            });
            const data = await res.json(); //data here is basically the response from the server (which will have every infom data.body which will our user details, response headers like Content-Type: application/json or Content-Length: 348 etc)

            if(data.error){
                throw new Error(data.error)
            }

            //localStorage - so that the user know that he/she is still logged in when seeing the console of the browser
            //related context/useSignup.jsx
            localStorage.setItem("chat-user",JSON.stringify(data));
            
            //user logged in to the website
            setAuthUser(data);
        }catch (error){
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    };
    return { loading, signup }
};

export default useSignup

function handleInputErrors({fullname, username, password, confirmPassword, gender}){
    if (!fullname || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill in all the fields");//toast.error is from the react-hot-toast
        return false
    }

    if (password !== confirmPassword){
        toast.error("Passwords do not match")
        return false
    }

    if(password.length < 6 ){
        toast.error("password must be at least 6 characters")
        return false
    }
    return true
}
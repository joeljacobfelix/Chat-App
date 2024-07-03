//Recommended :- Go through useContext hook lesson that you learned from bro code before you go through the contents in this file
//This file has two function. 1.To navigate back to home with the current data 2.To have the same data even if we refresh or close the browser window 
import { useState, useContext, createContext } from "react";

export const AuthContext = createContext(); 


//Things to note
    //AuthContextProvider is producer of variables to the children (basically AuthContext.Provider component being the producer component of the props which is used to wrap other components. in this project we have wrapped <App/> in main.jsx with this component)
    //userAuthContext is used in this project whenever we want to consume those variable. since the provider component wraps the app component (<App/>), we can use this function anywhere in the project since every component is the child or subchildes of APP component 
export const useAuthContext = () => {
    return useContext(AuthContext);//useContext() = React Hook allows you to share values between multiple levels of components without passing props through each level
}

export const AuthContextProvider = ({children}) => {
    const[authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null)
    //Things to know about the line above
        //"localStorage" is a feature in JavaScript that allows you to store key-value pairs in a web browser with no expiration date. This means that the data persists even after the browser is closed and reopened, or after the user navigates to a different page or tab. 
        //localStorage.getItem() return string and therefor has to be converted to JSON and therefore we use JSON.parse
    //Also the {chilren is the tag that we should put inside whenever we use AuthContext.Provider}
    
    return(
        <AuthContext.Provider value={{authUser,setAuthUser}}>
            {children}
        </AuthContext.Provider>
    ) 
}
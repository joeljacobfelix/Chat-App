import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req,res,next) => {
    try{
        
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({error: "Unauthorized - No Token Provided"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({error: "Unauthorized - Invalid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password");//this is the uder details without password due to this piece of code => select("-password") 

        if(!user) {
            console.log(decoded.userId)
            return res.status(404).json({error: "User not found"})
        }

        req.user=user;//The line req.user = user in your middleware function assigns the user 
                        //object retrieved from the database to the user property of the req object. This allows
                        // the user data to be accessible in the subsequent route handlers that the request passes through
                        // speaking more specifically this due to this line the user details created in this file is being assigned
                        //and can be used by message.controller.js without making new user detail and working on the user data we already have

        next();

    }catch(error){
        console.log("Error in protectRoute middleware: ",error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export default protectRoute
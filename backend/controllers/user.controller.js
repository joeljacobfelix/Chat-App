import User from "../models/user.model.js"

export const getUsersForSidebar = async (req,res) =>{
    try{
        const loggedInUserId = req.user._id;

        //const allUsers = new User.find() this is for all user including the logged in user. like in whatsapp you can message yourself. 
        //unlike the above line we are using {_id:{$ne : loggedInUserId}} inside find() for getting everyone excepy the guy who logged in 
        const allUsersExceptloggedInUserId = await User.find({
            _id:{$ne : loggedInUserId}
        }).select("-password"); //.select("-password") for not showing the password

        res.status(200).json(allUsersExceptloggedInUserId);
    }catch(error){
        console.error("Error in generateUserSidebar: ", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}
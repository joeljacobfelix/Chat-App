/*router.get("/signup",(req,res) =>{
    res.send("signup route")
})

router.get("/login", (req,res) =>{
    res.send("login route")
})

router.get("/logout", (req,res) =>{
    res.send("logout route")
})*/


// we have taken the above from the auth.routes.js file keeping only the CRUD functionality in there and the doing part in here so making it more readable
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const ShowAll = async (req,res) => {
    try{
        const user= await User.find();
        res.status(200).json({data: user})
    }
    catch(error){
        console.log("Error in Show All controller:",error.message);
        return res.status(500).json({error:"Internal Server Error"})
    }
}

export const DeleteUser = async (req,res) => {
    try{
        const { id } = req.params;
        const result = await User.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message: "Book not found"})
        }

        return res.status(200).json({message : "User details successfully deleted"})
    }
    catch(error){

        console.log(error.message);
        return response.status(500).json({error:"Internal Server Error"});
    }

}

export const signup = async (req,res) => {
    try{
        const { fullname, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword){
            return res.status(400).json({error: "Passwords don't match"})
        }

        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.status(400).json({message:"Username already exists"})
        }

        //Hash Password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const boyProfilePic = "https://avatar.iran.liara.run/public/boy?username=${username}";
        const girlProfilePic = "https://avatar.iran.liara.run/public/girl?username=${username}";

        const newUser = new User({
            fullname,
            username,
            password: hashedPassword,
            gender,
            profilePic: (gender === "male") ? boyProfilePic : girlProfilePic
        })

        if(newUser){ //i don't know how but somehow if i put this block of code inside this if condition, it is somehow optimised
            
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                username: newUser.username,
                gender: newUser.gender,
                profilePic: newUser.profilePic
            })
        }
        else{
            res.status(400).json({error: "Invalid user data"})
        }        
    }
    catch(error){
        console.log("Error in Signup Controller ", error.message)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export const login = async (req,res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isCorrectPassword = await bcrypt.compare(password,user?.password || "") //actually it should be bcrypt.compare(password,user.password) but we wanna know first whether the user exist otherwise it would be nothing. don't confuse, we will check for the existence for the user and password later. here we are just assigning "" to the password if user doesn't exist

        if (!user || !isCorrectPassword){
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        })
    }
    catch(error){
        console.log("Error in the Login controller ",error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

export const logout = (req,res) => {
    try{
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Logged out successfully"})
    }
    catch(error){
        console.log("Error in the Login controller ",error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
}

//the only problem i have is how is console.log equivalent to res.send?
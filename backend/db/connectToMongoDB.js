//password: 2FVzLfZAErCx1ckf
//mongodb+srv://joeljacobfelix:2FVzLfZAErCx1ckf@cluster0.iz3aabi.mongodb.net/chat-app-db?retryWrites=true&w=majority&appName=Cluster0

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()


const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB")
    }
    catch(error){
        console.log("Error connecting to MongoDB ",error.message)
    }
}

export default connectToMongoDB
import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { getReceiverSocketId } from "../socket/socket.js";

import  { io }  from "../socket/socket.js";

export const sendMessage = async (req,res) => {
    try{
        const { message } =req.body;// we get message to be sent as an input from the user
        const{ id: receiverId } = req.params; //we get id as a parameter i.e from the endpoint for instance post method on http://localhost:3000/messages/(id of the person the user want to send to)
        const senderId = req.user._id; //user defined in the middleware(protectRoute.js Middleware. this middleware is connected in the router shown in message.routes.js). Not here.

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]} // $ all syntax is mongodb syntax. it tells to choose the particular conversation which has those participants in mentioned in the field
        })

        if(!conversation){ //this case is for a chat between people who just started i.e didn't have an existing chat
            conversation = await Conversation.create({
                participants: [senderId, receiverId] // $ all syntax is mongodb syntax. it adds every participants in the list
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        //await conversation.save() //don't forget to save. cuz many people do
        //await newMessage.save() //don't forget to save. cuz many people do

        //the above two commented out lines would be not be done in parallel which can make it slow. the second saving would only be done after the first one.
        //instead we can do the next line to make it parallel
        await Promise.all([newMessage.save(),conversation.save()])

        //SOCKET IO FUNCTIONALITY
        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            // io.to(<socket_id).emit() used to send events to specific client unlike the io.emit() function which send to every user/clients
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
 
        res.status(201).json(newMessage);
    }
    catch(error){
        console.log("Error in sendMessage controller:", error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userFromTheOtherSide } = req.params;
        const senderId = req.user._id;

        // Find the conversation that includes both participants
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userFromTheOtherSide] }
        }).populate("messages");

         //without the populate function above, the message array in conversation object would be like the first one and not the second one. but we need it like the second one which has the messages themselves (every detail of every message) and not just message IDs
        //basically the populate function expands the message ids
        //first one                                         //second one
        //messages: [                                       messages: [
        //    new ObjectId('665fac4ce81f736de10267d3'),         {
        //    new ObjectId('6660e34fbcf66bf47256b6e4'),             _id: new ObjectId('665fac4ce81f736de10267d3'),
        //    new ObjectId('6660e3c2bcf66bf47256b6ea')              other details of this message
        //                                                      },
           
        //                                                      {
        //                                                        _id: new ObjectId('6660e34fbcf66bf47256b6e4'),
        //                                                        other details of this message
        //                                                      },
        //                                                      {
        //                                                         _id: new ObjectId('6660e3c2bcf66bf47256b6ea'),
        //                                                        other details of this message
        //                                                      }
        //                                                    ]

        if (!conversation)  return res.status(200).json([]);

        const messages = conversation.messages || []; // Ensure messages is an array

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


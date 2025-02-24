 import express from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js"

const router = express.Router();

router.get("/:id", protectRoute, getMessages)
router.post("/send/:id", protectRoute ,sendMessage); //so the protectRoute i made in here is a middleware which checks wether the user is logged in and grants them the right to converse with anyother user

export default router;
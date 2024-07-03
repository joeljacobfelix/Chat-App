import express from "express";
import { ShowAll, DeleteUser, signup, login, logout } from "../controllers/auth.controller.js";

const router  = express.Router();

router.get("/", ShowAll); //remove this afterwards
router.delete("/:id", DeleteUser); //remove this afterwards

router.post("/signup",signup)

router.post("/login", login)

router.post("/logout", logout)

export default router
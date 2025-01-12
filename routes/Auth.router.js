import { Router } from "express";
import { authController as controller } from "../controllers/Auth.controller.js";

const authRouter = Router();

authRouter.post("/register", controller.register);
authRouter.get("/login", controller.login)

export {authRouter};
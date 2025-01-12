import { Router } from "express";
import {userController as controller} from "../controllers/User.controller.js";

const userRouter = Router();

userRouter.get("/:id", controller.getUser);
userRouter.post("/", (req, res) => {
    res.send("successful created").status(201);
});
userRouter.patch("/", (req, res) => {
    res.send("Edited Successfully").status(200);
});
userRouter.delete("/", (req, res) => {
    res.send("Deleted Successfully").status(200);
});

export default userRouter
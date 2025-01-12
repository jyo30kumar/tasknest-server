import { Router } from "express";
import { todoController as controller } from "../controllers/Todo.controller.js";
import { authenticateToken } from "../middlewares/authTokenHandler.js";

//router app
const todoRouter = Router();

// routers
todoRouter.get("/", authenticateToken, controller.getTodo);
todoRouter.post("/", authenticateToken, controller.addTodo);
todoRouter.put("/:todoId", authenticateToken, controller.editTodo);
todoRouter.delete("/:todoId", authenticateToken, controller.deleteTodo);

export default todoRouter;

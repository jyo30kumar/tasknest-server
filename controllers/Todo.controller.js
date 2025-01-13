import { todoServices } from "../services/Todo.services.js";


//get all the list of todo
const getTodo = async (req, res, next) => {
  try {
    const todoList = await todoServices.getTodoList(req.userData["userId"]); 
    res.status(200).json(todoList);
  } catch (error) {
    console.error("Error while getting todo task", error);
    res.status(500).json(error.message);
  }
};

// add todo in the list
const addTodo = async (req, res, next) => {
  try {
    const result  = await todoServices.addTodoTask(req.userData["userId"], req.body)
    res.status(201).json(result);
  } catch (error) {
    console.log("Error while adding todo task", error);
    res.status(500).json(error.message);
  }
};

// edit todo list
const editTodo = async (req, res, next) => {
 
  try {
    const result = await todoServices.editTodoTask(req.userData["userId"], req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// delete todo from the list
const deleteTodo = async (req, res) => {
  try {
    const result = await todoServices.deleteTodoTask(req.userData["userId"], req.body["todoId"]);
    res.status(200).send(result.message);
  } catch (error) {
    res.status(500).json(error.message)
  }
  
};

const todoController = {
  getTodo,
  addTodo,
  editTodo,
  deleteTodo,
};

export { todoController };

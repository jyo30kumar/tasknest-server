import db from "../database/db.js";

const table = "todo";

//get all the list of todo
const getTodo = async (req, res, next) => {
  const { user_id: userId } = req.userData;
  try {
    const response = await db.query(
      `SELECT * FROM ${table} WHERE user_id = $1`,
      [userId]
    );
    const result = response.rows;
    res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching todos : ", error);
    res.status(505).send("Internal Server Error.");
  }
};

// add todo in the list
const addTodo = async (req, res, next) => {
  const { user_id: userId } = req.userData;
  const { task, dueDate, taskPriority } = req.body;
  try {
    const response = await db.query(
      `INSERT INTO ${table} (task, due_date, task_priority, user_id) values($1, $2, $3, $4) RETURNING *`,
      [task, dueDate, taskPriority, userId]
    );
    const result = response.rows;
    res.status(201).send(result);
  } catch (error) {
    console.error("Error Adding todo: ", error);
    res.status(505).send("Internal Server Error.");
  }
};

// edit todo list
const editTodo = async (req, res, next) => {
  const { user_id: userId } = req.userData;
  const { task, dueDate, taskPriority } = req.body;
  try {
    const response = await db.query(
      `UPDATE ${table} SET task = $1, due_date = $2, task_priority = $3, user_id = $4 WHERE user_id = $4 and todo_id = $5`,
      [task, dueDate, taskPriority, userId, todoId]
    );
    const result = response.rows;
    res.status(200).send(result);
  } catch (error) {
    console.error("Error Updating todo: ", error);
    res.status(505).send("Internal Server Error.");
  }
};

// delete todo from the list
const deleteTodo = async (req, res) => {
  const { user_id: userId } = req.userData;
  try {
    const response = await db.query(
      `DELETE FROM ${table} WHERE user_id = $1 and todo_id = $2`,
      [userId, todoId]
    );
    if (response.rowCount === 0) {
      return res.status(404).send("Todo item not found.");
    }
    res.status(200).send("Todo item deleted successfully.");
  } catch (error) {
    console.error("Error Deleting todo: ", error);
    res.status(500).send("Internal Server Error.");
  }
};

const todoController = {
  getTodo,
  addTodo,
  editTodo,
  deleteTodo,
};

export { todoController };

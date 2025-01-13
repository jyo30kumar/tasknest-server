import db from "../database/db.js";

const getTodoList = async (userId) => {
  try {
    const response = await db.query(`SELECT * FROM todo WHERE user_id = $1`, [
      userId,
    ]);
    const result = response.rows;
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const addTodoTask = async (userId, { task, dueDate, taskPriority }) => {
  try {
    const response = await db.query(
      `INSERT INTO todo (task, due_date, task_priority, user_id) values($1, $2, $3, $4) RETURNING *`,
      [task, dueDate, taskPriority, userId]
    );
    const result = response.rows;
    return result;
  } catch (error) {
    console.error("Error while Adding todo: ", error);
    throw new Error(error);
  }
};

const editTodoTask = async (userId, { task, dueDate, taskPriority }) => {
  try {
    const response = await db.query(
      `UPDATE todo SET task = $1, due_date = $2, task_priority = $3, user_id = $4 WHERE user_id = $4 and todo_id = $5`,
      [task, dueDate, taskPriority, userId, todoId]
    );
    const result = response.rows;
    return result;
  } catch (error) {
    console.error("Error Updating todo: ", error);
    throw new Error(error);
  }
};

const deleteTodoTask = async (userId, todoId) => {
  try {
    const response = await db.query(
      `DELETE FROM todo WHERE user_id = $1 and todo_id = $2`,
      [userId, todoId]
    );
    if (response.rowCount === 0) {
      throw new Error("Todo item not found.");
    }
    return { message: "Todo item deleted successfully." };
  } catch (error) {
    throw new Error(error);
  }
};
const todoServices = {
  getTodoList,
  addTodoTask,
  editTodoTask,
  deleteTodoTask,
};

export { todoServices };

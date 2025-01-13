import db from "../database/db.js";
import { hashPassword } from "../utils/hashPassword.js";

const getUserInfo = async (userId) => {
  try {
    const response = await db.query(
      `SELECT (user_email, user_name) FROM users WHERE user_id = $1`,
      [userId]
    );
    const result = response.rows;
    if (result.length === 0) {
      throw new Error("User not Found.");
    }
    return result;
  } catch (error) {
    console.error("Error while fetching user: ", error);
    throw new Error(error);
  }
};

const editUserInfo = async (userId, {email, password, userName}) => {
  try {
    //validating the expression of email
    validator.validateEmail(email);

    // checking for duplicate entries
    const result = await db.query(
        `SELECT user_email FROM users WHERE user_email = $1`,
        [email]
      );
      if (result.rows.length > 0) {
        throw new Error("Email already exists.");
      }
      // hasing password and inserting user into table
      const hashedPassword = await hashPassword(password);
  

    const response = await db.query(
      `UPDATE users SET user_email = $1, user_password = $2, user_name = $3 WHERE user_id = $4 RETURNING *`,
      [email, hashedPassword, userName, userId]
    );
    const queryData = response.rows[0];
    return queryData;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteUserInfo = async(userId) =>{
    try {
        const response = await db.query("DELETE FROM users WHERE user_id = $1", [userId])
        if(response.rowCount === 0){
            throw new Error("User Not Found.");
        }
        return {message : "User deleted successfully."}
    } catch (error) {
        throw new Error(error);
    }
}

const userServices = {
  getUserInfo,
  editUserInfo,
  deleteUserInfo,
};

export { userServices };

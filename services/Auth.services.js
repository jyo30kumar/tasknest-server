import db from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validator } from "../utils/validator.js";
import { hashPassword } from "../utils/hashPassword.js";

const registerUser = async (userData) => {
  const { email, password } = userData;
  //Input Validation
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  //validating the expression of email
  validator.validateEmail(email);


  try {
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

    //Inserting user into database
    const response = await db.query(
      `INSERT INTO users (user_email, user_password) values ($1, $2) RETURNING *`,
      [email, hashedPassword]
    );
    const queryData = response.rows[0];
    const userPayload = {
      userId: queryData["user_id"],
    };
    //generating token after registration
    const token = jwt.sign(userPayload, process.env.TOKENSECRET, {
      expiresIn: "1h",
    });
    return { ...userPayload, accessToken: token };
  } catch (error) {
    throw new Error(error);
  }
};

const loginUser = async (userData) => {
  const { email, password } = userData;

  try {
    const response = await db.query(
      `SELECT * FROM users WHERE user_email = $1`,
      [email]
    );
    const queryData = response.rows;
    if (queryData.length === 0) {
      throw new Error("User Not Found.");
    }

    // validate password
    const success = await validator.validatePassword(
      password,
      queryData[0].user_password
    );
    if (!success) {
      throw new Error("Wrong Password. Login Failed.");
    }

    const userPayload = {
      userId: queryData[0].user_id,
      userEmail: queryData[0].user_email,
    };
    //generating token after authentication
    const token = jwt.sign(userPayload, process.env.TOKENSECRET, {
      expiresIn: "1h",
    });
    return { ...userPayload, accessToken: token };
  } catch (error) {
    throw new Error(error);
  }
};

const authServices = {
  registerUser,
  loginUser,
};

export { authServices };

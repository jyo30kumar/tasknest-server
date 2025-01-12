import "dotenv/config";
import { authServices as services } from "../services/Auth.services.js";

// register controller
const register = async (req, res) => {
  try {
    const newUser = await services.registerUser(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// login controller
const login = async (req, res) => {
  try {
    const userData = await services.loginUser(req.body);
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

const authController = {
  register,
  login,
};

export { authController };

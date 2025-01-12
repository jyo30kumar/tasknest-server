import bcrypt from "bcrypt";

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format.");
  }
};

const validatePassword = async (plainPassword, hashPassword) => {
  try {
    const result = await bcrypt.compare(plainPassword, hashPassword);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const validator = {
  validateEmail,
  validatePassword,
};

export { validator };

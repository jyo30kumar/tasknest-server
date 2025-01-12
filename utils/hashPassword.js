import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    throw new Error(error);
  }
};

export { hashPassword };

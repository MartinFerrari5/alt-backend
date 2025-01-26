import { userSchema } from "../guards/schema.guards.js";
import {
  getAllUsersFromDB,
  getUserByIdFromDB,
  addUserToDB,
} from "../services/users/users.service.js";

const getAllUsers = async (req, res) => {
  const result = await getAllUsersFromDB();
  res.status(200).json(result[0]);
};

const getUserById = async (req, res) => {
  const { user_id } = req.params;
  const result = await getUserByIdFromDB(user_id);
  res.status(200).json(result[0]);
};

const addUserController = async (req, res, next) => {
  try {
    const { name, last_name, email, password, role } = req.body;

    const { error } = userSchema.validate({
      name,
      last_name,
      email,
      password,
    });

    if (error) {
      return res.status(400).json(error.message);
    }

    await addUserToDB(name, last_name, email, password, role);

    return res.status(200).json({ message: "User created" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { getAllUsers, getUserById, addUserController };

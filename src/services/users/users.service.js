import { connection } from "../../database/connection.js";
import { hashPassword } from "./password.service.js";

const getAllUsersFromDB = () => {
  const query = "SELECT * FROM users;";
  return connection.query(query);
};

const getUserByIdFromDB = (user_id) => {
  const query = "SELECT * FROM users WHERE id = ?;";
  return connection.query(query, [user_id]);
};

const addUserToDB = async (name, last_name, email, password, role) => {
  try {
    const hashedPassword = await hashPassword(password);

    const [result] = await connection.query(
      "INSERT INTO users  VALUES (UUID(),?,?,?,?,?);",
      [name, last_name, email, hashedPassword, role],
    );
  } catch (error) {
    throw new Error("Failed to add user to the database");
  }
};

export { getAllUsersFromDB, getUserByIdFromDB, addUserToDB };

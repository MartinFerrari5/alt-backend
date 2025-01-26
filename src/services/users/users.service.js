import { connection } from "../../database/connection.js";
import { hashPassword } from "./password.service.js";
import dotenv from "dotenv";

dotenv.config();

const table_users = process.env.TABLE_USERS;

const getAllUsersFromDB = () => {
  const query = `SELECT * FROM ${table_users};`;
  return connection.query(query);
};

const getUserByIdFromDB = (user_id) => {
  const query = `SELECT * FROM ${table_users} WHERE id = ?;`;
  return connection.query(query, [user_id]);
};

const addUserToDB = async (
  name,
  last_name,
  email,
  password,
  role = "employee",
) => {
  try {
    const hashedPassword = await hashPassword(password);
    const query = `INSERT INTO alt_users (id,name, last_name, email, password, role) VALUES (UUID(),?, ?, ?, ?, ?);`;
    console.log(query);
    const [result] = await connection.query(query, [
      name,
      last_name,
      email,
      hashedPassword,
      role,
    ]);
  } catch (error) {
    throw new Error("Error al registrar usuario");
  }
};

export { getAllUsersFromDB, getUserByIdFromDB, addUserToDB };

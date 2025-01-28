import { connection } from "../../database/connection.js";
import { hashPassword } from "./password.service.js";
import dotenv from "dotenv";

dotenv.config();

const table_users = process.env.TABLE_USERS;

const employees = ["admin", "employee"];

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
    if (!employees.includes(role)) {
      const error = new Error("Rol no valido");
      error.status = 400;
      throw error;
    }
    const hashedPassword = await hashPassword(password);
    const query = `INSERT INTO alt_users (id,name, last_name, email, password, role) VALUES (UUID(),?, ?, ?, ?, ?);`;

    const [result] = await connection.query(query, [
      name,
      last_name,
      email,
      hashedPassword,
      role,
    ]);
  } catch (error) {
    throw error;
  }
};

export { getAllUsersFromDB, getUserByIdFromDB, addUserToDB };

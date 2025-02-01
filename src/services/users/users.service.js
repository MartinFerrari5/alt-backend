import { connection } from "../../database/connection.js";
import { checkDuplicatedUserService } from "../email/email.service.js";
import { hashPassword } from "./password.service.js";
import { config } from "../../utils/config.js";

const { users_table, emails_table } = config;

const employees = ["admin", "user"];

const getAllUsersFromDB = () => {
  const query = `SELECT * FROM ${users_table};`;
  return connection.query(query);
};

const getUserByIdFromDB = (user_id) => {
  const query = `SELECT * FROM ${users_table} WHERE id = ?;`;
  return connection.query(query, [user_id]);
};

const addUserToDB = async (full_name, email, password, role = "user") => {
  try {
    await checkDuplicatedUserService(users_table, email);
    if (!employees.includes(role)) {
      const error = new Error("Rol no valido");
      error.status = 400;
      throw error;
    }
    const hashedPassword = await hashPassword(password);
    const query = `INSERT INTO alt_users (id,full_name, email, password, role) VALUES (UUID(),?, ?, ?, ?);`;

    const [result] = await connection.query(query, [
      full_name,
      email,
      hashedPassword,
      role,
    ]);
  } catch (error) {
    throw error;
  }
};

export { getAllUsersFromDB, getUserByIdFromDB, addUserToDB };

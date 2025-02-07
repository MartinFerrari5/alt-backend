// src/services/users/users.service.js

import { connection } from "../../database/connection.js";
import { checkDuplicatedUserService } from "../email/email.service.js";
import { hashPassword } from "./password.service.js";
import { config } from "../../utils/config.js";
import { emailSchema } from "../../guards/schema.guards.js";

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

async function updateUserService(user_id, updated_data) {
  const keys = Object.keys(updated_data);
  const string_query = [];
  // Validacion si el admin quiere cambiar email
  if (keys.includes("email")) {
    const { error } = emailSchema.validate({ email: updated_data.email });

    if (error) {
      throw error;
    }

    await checkDuplicatedUserService(users_table, updated_data.email);
  }

  for (const [keys, value] of Object.entries(updated_data)) {
    const params = `${keys} = "${value}"`;

    string_query.push(params);
  }

  const query = `UPDATE ${users_table} SET ${string_query} WHERE id = ?;`;
  return connection.query(query, [user_id]);
}

async function deleteUserService(user_id) {
  const query = `DELETE FROM ${users_table} WHERE id = ?;`;
  return connection.query(query, [user_id]);
}

export {
  getAllUsersFromDB,
  getUserByIdFromDB,
  addUserToDB,
  updateUserService,
  deleteUserService,
};

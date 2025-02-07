//src/services/email/email.service.js

import { connection } from "../../database/connection.js";
import { config } from "../../utils/config.js";

const { users_table, emails_table } = config;

async function addEmailService(email) {
  try {
    await checkDuplicatedUserService(emails_table, email);
    const query = `INSERT INTO ${emails_table} (id, email) VALUES (UUID(),?);`;
    return connection.query(query, [email]);
  } catch (error) {
    throw error;
  }
}

async function checkDuplicatedUserService(table, email) {
  try {
    const query = `SELECT * FROM ${table} WHERE email = ?;`;
    const [user] = await connection.query(query, [email]);

    if (user.length > 0) {
      const error = new Error("Email ya registrado");
      error.status = 400;
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

async function deleteEmailService(email_id) {
  const query = `DELETE FROM ${emails_table} WHERE id = ?;`;
  return connection.execute(query, [email_id]);
}

export { addEmailService, checkDuplicatedUserService, deleteEmailService };

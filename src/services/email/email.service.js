//src/services/email/email.service.js

import { connection } from "../../database/connection.js";
import { config } from "../../utils/config.js";

const { users_table, emails_table } = config;

async function addEmailService(email) {
  try {
    await checkDuplicatedUserService(emails_table, email);
    const query = `INSERT INTO ${emails_table} (id, email) VALUES (UUID(),?);`;
    await connection.query(query, [email]);

    return connection.execute(
      `SELECT id FROM ${emails_table} ORDER BY created_at DESC LIMIT 1;`,
    );
  } catch (error) {
    throw error;
  }
}

async function checkDuplicatedUserService(table, email, requested = false) {
  try {
    const query = `SELECT * FROM ${table} WHERE email = ?;`;
    const [user] = await connection.query(query, [email]);

    if (requested == true && user.length <= 0) {
      const error = new Error("Email no registrado");
      error.status = 400;
      throw error;
    }

    if (user.length > 0 && !requested) {
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
  const [result] = await connection.execute(query, [email_id]);
  if (result.affectedRows <= 0) {
    const error = new Error("El mail no existe");
    error.status = 403;
    throw error;
  }
}

async function getAllEmailsService() {
  const query = `SELECT * FROM ${emails_table};`;
  const [emails] = await connection.query(query);
  return emails;
}

export {
  addEmailService,
  checkDuplicatedUserService,
  deleteEmailService,
  getAllEmailsService,
};

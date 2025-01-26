import { connection } from "../database/connection.js";
import { verifyPassword } from "./users/password.service.js";
import { generateToken } from "../middleware/token.middleware.js";
import dotenv from "dotenv";

dotenv.config();

const table_users = process.env.TABLE_USERS;

async function logInUserService(email, password) {
  try {
    // Query

    const sql = `SELECT * FROM ${table_users} WHERE email = ?`;
    const [user] = await connection.execute(sql, [email]);

    if (user.length == 0 || user[0].email !== email) {
      throw new Error("Email o contraseña incorrectos");
    }

    // Verificar contraseña
    await verifyPassword(password, user[0].password);

    // Generar token
    return generateToken(user[0].id, user[0].role);
  } catch (error) {
    throw error;
  }
}

export { logInUserService };

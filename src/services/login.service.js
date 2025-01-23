import { connection } from "../database/connection.js";
import { verifyPassword } from "./users/password.service.js";
import { generateToken } from "../middleware/token.middleware.js";

async function logInUserService(user_id, email, password) {
  try {
    // Query
    const sql = `SELECT * FROM users WHERE id = ?`;
    const [user] = await connection.execute(sql, [user_id]);

    if (user[0].email !== email) {
      throw new Error("Email o contraseña incorrectos");
    }

    // Verificar contraseña
    await verifyPassword(password, user[0].password);

    // Generar token
    return generateToken(user[0].id);
  } catch (error) {
    throw error;
  }
}

export { logInUserService };

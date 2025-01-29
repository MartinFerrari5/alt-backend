import { config } from "../utils/config.js";
import { connection } from "../database/connection.js";

const { users_table } = config;

async function verifyEmailMiddleware(req, res, next) {
  try {
    const { email } = req.body;
    const query = `SELECT * FROM ${users_table} WHERE email = ?;`;
    const [user] = await connection.query(query, [email]);
    if (!user[0]) {
      return res.status(404).json({ message: "Email no encontrado" });
    }
    req.userData = {
      email: user[0].email,
      password: user[0].password,
    };
    next();
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export { verifyEmailMiddleware };

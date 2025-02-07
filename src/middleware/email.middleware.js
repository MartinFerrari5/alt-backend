//src/middleware/email.middleware.js

import { config } from "../utils/config.js";
import { connection } from "../database/connection.js";

const { users_table, emails_table } = config;

function verifyEmailMiddleware(requested) {
  return async (req, res, next) => {
    try {
      const { email } = req.body;
      const query = requested
        ? `SELECT * FROM ${users_table} WHERE email = ?;`
        : `SELECT * FROM ${emails_table} WHERE email = ?;`;

      const [user] = await connection.query(query, [email ?? true]);

      if (!user[0] && requested) {
        return res.status(404).json({ message: "Email no encontrado" });
      } else if (!user[0] && !requested) {
        return res
          .status(400)
          .json({ message: "Email no habilitado a crear usuario" });
      }

      // Siguiente linea utilizada para el cambio de contraseña
      req.userData = {
        email: user[0]?.email,
        password: user[0]?.password,
      };
      next();
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
}

export { verifyEmailMiddleware };

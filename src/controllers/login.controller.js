import { connection } from "../database/connection.js";
import { verifyPassword } from "../services/users/password.service.js";
import { loginSchema } from "../guards/schema.guards.js";
import { logInUserService } from "../services/login.service.js";

/**
 * * Log in user
 * @param {string} user_id
 * @param {string} email
 * @param {string} password
 */

async function logInUser(req, res) {
  try {
    const { user_id } = req.params;
    const { email, password } = req.body;

    const { error } = loginSchema.validate({ email, password });

    if (error) {
      return res.status(400).json(error.message);
    }

    const token = await logInUserService(user_id, email, password);

    res.status(200).json({ message: "Login exitoso", token });
  } catch (error) {
    res.status(401).json(error.message);
  }
}

export { logInUser };

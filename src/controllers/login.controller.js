// src/controllers/login.controller.js

import { loginSchema } from "../guards/schema.guards.js";
import { logInUserService } from "../services/login.service.js";

/**
 * * Log in user
 * @param {string} user_id
 * @param {string} email
 * @param {string} password
 */

async function logInUserController(req, res) {
  try {
    const { email, password } = req.body;

    const { error } = loginSchema.validate({ email, password });

    if (error) {
      return res.status(400).json(error.message);
    }

    const { token, refreshToken } = await logInUserService(email, password);

    res.status(200).json({ message: "Login exitoso", token, refreshToken });
  } catch (error) {
    res.status(401).json(error.message);
  }
}

export { logInUserController };

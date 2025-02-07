// src/controllers/home.controller.js

import { connection } from "../database/connection.js";
import dotenv from "dotenv";

dotenv.config();

const table_users = process.env.TABLE_USERS;
async function homeController(req, res, next) {
  try {
    const query = `SELECT * FROM ${table_users}  WHERE id = ?;`;
    const [user] = await connection.query(query, [req.user.id]);
    if (!user[0]) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({
      id: user[0].id,
      name: user[0].name,
      last_name: user[0].last_name,
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export { homeController };

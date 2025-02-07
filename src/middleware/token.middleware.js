//src/middleware/token.middleware.js

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { addRefreshTokenToDB } from "../services/token.service.js";

dotenv.config();
async function generateToken(user_id, role) {
  try {
    const token = jwt.sign({ userId: user_id, role }, process.env.JWT_SECRET, {
      subject: "accessUser",
      // expiresIn: "1h",
    });

    const refreshToken = jwt.sign(
      { userId: user_id },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        subject: "accessUser",
        expiresIn: "1w",
      },
    );

    // await addRefreshTokenToDB(refreshToken,user_id);
    return { token, refreshToken };
  } catch (error) {
    throw new Error("Error al generar el token");
  }
}

export { generateToken };

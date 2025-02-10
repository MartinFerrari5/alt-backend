//src/middleware/auth.middleware.js

import jwt from "jsonwebtoken";
import { config } from "../utils/config.js";

const { token_pass } = config;

async function authenticateToken(req, res, next) {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ message: "Acceso denegado" });
  }
  try {
    const decodedAccessToken = jwt.verify(accessToken, token_pass);

    req.user = { id: decodedAccessToken.userId, role: decodedAccessToken.role };

    next(); /** Ejecuta el controller que le sigue el middleware **/
  } catch (error) {
    return res.status(401).json({ message: "Token expirado o invalido" });
  }
}

function authorize(roles = []) {
  return async (req, res, next) => {
    const { role } = req.user;

    if (!roles.includes(role)) {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  };
}

export { authenticateToken, authorize };

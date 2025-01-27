import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { getUserByIdFromDB } from "../services/users/users.service.js";

async function authenticateToken(req, res, next) {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ message: "Acceso denegado" });
  }
  try {
    const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET);

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

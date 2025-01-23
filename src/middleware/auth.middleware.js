import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

async function authenticateToken(req, res, next) {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    return res.status(401).json({ message: "Acceso denegado" });
  }
  try {
    const decodedAccessToken = jwt.verify(accessToken, process.env.JWT_SECRET);

    req.user = { id: decodedAccessToken.userId };

    next(); /** Ejecuta el controller que le sigue el middleware **/
  } catch (error) {
    return res.status(401).json({ message: "Token expirado o invalido" });
  }
}

export { authenticateToken };

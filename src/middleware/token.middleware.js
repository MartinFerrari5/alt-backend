import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
async function generateToken(user_id) {
  try {
    const token = jwt.sign({ userId: user_id }, process.env.JWT_SECRET, {
      subject: "accessUser",
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export { generateToken };

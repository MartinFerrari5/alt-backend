//src/services/users/password.service.js

import bcrypt from "bcrypt";
import { transporter } from "../../utils/email_sender.js";
import { config } from "../../utils/config.js";
import { connection } from "../../database/connection.js";
import crypto from "crypto";
import { passwordSchema } from "../../guards/schema.guards.js";

const { users_table } = config;
async function hashPassword(plainPassword) {
  const saltRounds = await bcrypt.genSalt(10); // Number of salt rounds (higher is more secure but slower)
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}

async function verifyPassword(plainPassword, hashedPassword) {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  if (!match) {
    const error = new Error("Email o contraseña incorrectos");
    error.status = 401;
    throw error;
  }
  return match; // Returns true if passwords match, false otherwise
}

async function updatePasswordService(email, password) {
  try {
    const hashedPassword = await hashPassword(password);
    const query = `UPDATE ${users_table} SET password = ? WHERE email = ?;`;
    const [result] = await connection.query(query, [hashedPassword, email]);
    return result;
  } catch (error) {
    throw error;
  }
}

async function sendNewPasswordService(email) {
  try {
    // Genera contraseña random
    const password = crypto
      .randomBytes(10)
      .toString("base64")
      .slice(0, 10)
      .replace(/\+/g, "0")
      .replace(/\//g, "0");

    // Email details
    const mailOptions = {
      from: process.env.EMAIL, // Sender address
      to: email, // Receiver email
      subject: "ALT-Nueva contraseña ",
      html: `
      <h2>Saludos,</h2>
      <p>Su nueva contraseña es: <strong>${password}</strong></p>
      <p>Por favor cambiarla por una que se acuerde.</p>
    `,
    };
    await transporter.sendMail(mailOptions);

    return updatePasswordService(email, password);

    //  await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
}

async function changePasswordService(
  email,
  old_password,
  new_password,
  user_data,
) {
  try {
    // Verifica que la contraseña a cambiar este asociada la usuario en cuestion
    await verifyPassword(old_password, user_data.password);
    const { error } = passwordSchema.validate({ new_password });

    if (error) {
      throw error;
    }
    const new_hashed_password = await hashPassword(new_password);

    const query = `UPDATE ${users_table} SET password = ? WHERE email = ?;`;
    const [result] = await connection.query(query, [
      new_hashed_password,
      email,
    ]);
    return result;
  } catch (error) {
    throw error;
  }
}

export {
  hashPassword,
  verifyPassword,
  sendNewPasswordService,
  changePasswordService,
};

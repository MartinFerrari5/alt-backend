import bcrypt from "bcrypt";
async function hashPassword(plainPassword) {
  const saltRounds = await bcrypt.genSalt(10); // Number of salt rounds (higher is more secure but slower)
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}

async function verifyPassword(plainPassword, hashedPassword) {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  if (!match) {
    throw new Error(
      "Email o contraseña incorrectos",
      (options = { cause: 401 }),
    );
  }
  return match; // Returns true if passwords match, false otherwise
}

export { hashPassword, verifyPassword };

import bcrypt from "bcrypt";
async function hashPassword(plainPassword) {
    const saltRounds = 10; // Number of salt rounds (higher is more secure but slower)
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
}

async function verifyPassword(plainPassword, hashedPassword) {

    const match = await bcrypt.compare(plainPassword, hashedPassword);
    if(!match){
        const error = Error("Contraseña incorrecta")
        error.status = 400
        throw error
    }
    return match; // Returns true if passwords match, false otherwise
}

export {hashPassword, verifyPassword}
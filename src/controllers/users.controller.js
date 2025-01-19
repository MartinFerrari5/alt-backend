import { connection } from "../database/connection.js";
import { hashPassword } from "../middleware/password.middlewar.js";

const getAllUsers = async (req, res) => {
    const [result] = await connection.query("SELECT * FROM users;")
    res.status(200).json(result)
}

const addUser = async (req, res) => {
    const {name,last_name,email, password,role,status} = req.body
    const hashedPassword = await hashPassword(password);
    const [result] = await connection.query("INSERT INTO users  VALUES (UUID(),?,?,?,?,?,?);", [ name,last_name,email, hashedPassword,role,Boolean(status)])
    res.status(200).json(result)
}

export {getAllUsers,addUser}
import { connection } from "../database/connection.js";
import { verifyPassword } from "../middleware/password.middlewar.js";
const logInUser = async (req,res) =>{
   try {
    const {user_id} = req.params
    const {email,password} = req.body

    const sql = `SELECT * FROM users WHERE id = ?`;
    const [user] =await connection.execute(sql, [user_id]);

    if(user[0].email !== email){
        const error = Error("Email incorrecto")
        error.status = 400
        throw error
    }
    
    await verifyPassword(password,user[0].password);
   } catch (error) {
        res.status(error.status).json(error.message)
   }
}

export {logInUser}
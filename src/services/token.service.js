import { connection } from "../database/connection.js";
import { config } from "../utils/config.js";

async function addRefreshTokenToDB(refresh_token, user_id) {
  const query = `INSERT INTO ${config.new_token_table} (id, token, user_id) VALUES (UUID(),?, ?);`;
  const [result] = await connection.query(query, [refresh_token, user_id]);
  return result;
}

export { addRefreshTokenToDB };

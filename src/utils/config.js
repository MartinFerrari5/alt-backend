import dotenv from "dotenv";
dotenv.config();

export const config = {
  new_token_table: process.env.REFRESH_TOKEN_TABLE,
  tasks_table: process.env.TABLE_TASKS,
  users_table: process.env.TABLE_USERS,
};

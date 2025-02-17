import dotenv from "dotenv";
dotenv.config();

export const config = {
  new_token_table: process.env.REFRESH_TOKEN_TABLE,
  tasks_table: process.env.TABLE_TASKS,
  users_table: process.env.TABLE_USERS,
  emails_table: process.env.TABLE_EMAILS,
  types_table: process.env.TABLE_TYPES,
  companies_table: process.env.TABLE_COMPANIES,
  projects_table: process.env.TABLE_PROJECTS,
  hour_type_table: process.env.TABLE_HOUR_TYPE,
  token_pass: process.env.JWT_SECRET,
};

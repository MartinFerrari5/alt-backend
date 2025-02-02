import { connection } from "../../database/connection.js";
import { config } from "../../utils/config.js";

const { types_table, companies_table, projects_table, hour_type_table } =
  config;
async function getOptionsService(table) {
  const table_db = config[table];
  const query = `SELECT options FROM ${table_db};`;

  const [options] = await connection.execute(query);

  const options_values = options.map((option) => option.options);

  return options_values;
}

export { getOptionsService };

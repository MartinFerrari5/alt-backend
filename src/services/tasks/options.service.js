// src/services/tasks/options.service.js

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

async function addOptionsService(table, option, { role }) {
  try {
    if (!table || !option) {
      const error = new Error("Todos los campos son requridos");
      error.status = 400;
      throw error;
    }
    if (role !== "admin") {
      const error = new Error("No tienes permiso para realizar esta accion");
      error.status = 403;
      throw error;
    }
    const table_db = config[table];

    const query = `INSERT INTO ${table_db} VALUES (UUID(),?);`;

    return connection.execute(query, [option]);
  } catch (error) {
    throw error;
  }
}

export { getOptionsService, addOptionsService };

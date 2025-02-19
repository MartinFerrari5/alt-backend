// src/services/tasks/options.service.js

import { connection } from "../../database/connection.js";
import { config } from "../../utils/config.js";

async function getOptionsService(table) {
  const table_db = config[table];
  const query = `SELECT id,options FROM ${table_db};`;

  return connection.execute(query);
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

    const query = `INSERT INTO ${table_db} VALUES (UUID(),?,now());`;
    await connection.execute(query, [option]);

    return connection.execute(`SELECT id FROM ${table_db} ORDER BY created_at DESC LIMIT 1;`);
  } catch (error) {
    throw error;
  }
}

async function updateOptionsService(options_id, table, option) {
  if (!options_id || !table || !option) {
    const error = new Error("Todos los campos son requridos");
    error.status = 400;
    throw error;
  }
  try {
    const real_table = config[table];
    const query = `UPDATE ${real_table} SET options = ? WHERE id = ?;`;
    const [response] = await connection.execute(query, [option, options_id]);

    if (response.affectedRows <= 0) {
      const error = new Error("Opcion no encontrada");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    throw error;
  }
}
async function deleteOptionsService(options_id, table) {
  if (!options_id || !table) {
    const error = new Error("Todos los campos son requridos");
    error.status = 400;
    throw error;
  }
  try {
    const real_table = config[table];
    const query = `DELETE FROM ${real_table} WHERE id = ?;`;
    const [response] = await connection.execute(query, [options_id]);

    if (response.affectedRows <= 0) {
      const error = new Error("Opcion no encontrada");
      error.status = 404;
      throw error;
    }
  } catch (error) {
    throw error;
  }
}

export {
  getOptionsService,
  addOptionsService,
  updateOptionsService,
  deleteOptionsService,
};

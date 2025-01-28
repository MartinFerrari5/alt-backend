import { connection } from "../../database/connection.js";
import { config } from "../../utils/config.js";

const { tasks_table } = config;

async function getAllTasksService() {
  const query = `SELECT * FROM ${tasks_table};`;
  return connection.query(query);
}

async function addTaskService(
  {
    company,
    project,
    task_type,
    task_description,
    entry_time,
    exit_time,
    lunch_hours,
    status,
  },
  user_id,
) {
  try {
    const [entry_hour, entry_minutes] = entry_time.split(":");
    const [exit_hour, exit_minutes] = exit_time.split(":");

    if (entry_hour > exit_hour) {
      const error = new Error(
        "La hora de entrada no puede ser mayor a la hora de salida",
      );
      error.status = 403;
      throw error;
    }

    const query = `INSERT INTO ${tasks_table} (id,company,project,task_type,task_description,entry_time,exit_time,lunch_hours,status,user_id) VALUES (UUID(),?,?,?,?,?,?,?,?,?);`;
    return connection.query(query, [
      company,
      project,
      task_type,
      task_description,
      entry_time,
      exit_time,
      lunch_hours,
      status,
      user_id,
    ]);
  } catch (error) {
    throw error;
  }
}

async function updateTaskService(task_id, task_data, user_data) {
  try {
    const update_values = [];
    const entries = Object.entries(task_data);
    const { id: user_id, role } = user_data;
    for (const [key, value] of entries) {
      update_values.push(`${key} = "${value}"`);
    }

    const update_string = update_values.join(", ");

    if (role === "admin") {
      const query = `UPDATE ${tasks_table} SET ${update_string} WHERE id = ?;`;
      return connection.query(query, [task_id]);
    }

    const query = `UPDATE ${tasks_table} SET ${update_string} WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.query(query, [task_id, user_id]);

    if (result.affectedRows <= 0) {
      const error = new Error("La tarea no existe o no tienes acceso a ella");
      error.status = 403;
      throw error;
    }
    return result;
  } catch (error) {
    throw error;
  }
}

async function deleteTaskService(task_id, user_data) {
  try {
    const { id: user_id, role } = user_data;

    if (role === "admin") {
      const query = `DELETE FROM ${tasks_table} WHERE id = ?;`;
      return connection.query(query, [task_id]);
    }

    const query = `DELETE FROM ${tasks_table} WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.query(query, [task_id, user_id]);

    if (result.affectedRows <= 0) {
      const error = new Error("La tarea no existe o no tienes acceso a ella");
      error.status = 403;
      throw error;
    }
    return result;
  } catch (error) {
    throw error;
  }
}

export {
  getAllTasksService,
  addTaskService,
  updateTaskService,
  deleteTaskService,
};

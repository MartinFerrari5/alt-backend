import { connection } from "../../database/connection.js";
import { config } from "../../utils/config.js";

const { tasks_table } = config;

async function getAllTasksService() {
  const query = `SELECT * FROM ${tasks_table};`;
  return connection.query(query);
}

async function addTaskService({
  company,
  project,
  task_type,
  task_description,
  entry_time,
  exit_time,
  lunch_hours,
}) {
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

    const query = `INSERT INTO ${tasks_table} (id,company,project,task_type,task_description,entry_time,exit_time,lunch_hours) VALUES (UUID(),?,?,?,?,?,?,?);`;
    return connection.query(query, [
      company,
      project,
      task_type,
      task_description,
      entry_time,
      exit_time,
      lunch_hours,
    ]);
  } catch (error) {
    throw error;
  }
}

export { getAllTasksService, addTaskService };

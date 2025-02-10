// src/services/tasks/tasks.service.js

import { connection } from "../../database/connection.js";
import { config } from "../../utils/config.js";

const { tasks_table, users_table } = config;

async function getAllTasksService(user_data, optional_query = true) {
  const { id: user_id, role } = user_data;

  if (role === "admin") {
    const query =
      `SELECT t.*,u.full_name,sec_to_time(sum(time_to_Sec(worked_hours)) over(ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)) as incremental_total,
    sec_to_time(sum(time_to_Sec(worked_hours)) over()) as total FROM ${tasks_table} t  ` +
      `INNER JOIN ${users_table} u ON u.id = t.user_id ` +
      ` where  ` +
      optional_query +
      " order by task_date ";

    return connection.query(query);
  }

  const query =
    `SELECT t.*,u.full_name,sec_to_time(sum(time_to_Sec(worked_hours)) over(ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)) as incremental_total,
      sec_to_time(sum(time_to_Sec(worked_hours)) over(order by task_date)) as total FROM ${tasks_table} t  ` +
    `INNER JOIN ${users_table} u ON u.id = t.user_id ` +
    ` where user_id = ? and ` +
    optional_query +
    " order by task_date ";

  return connection.execute(query, [user_id]);
}

async function getTaskByIdService(task_id, user_data, optional_query = true) {
  const { id: user_id, role } = user_data;
  if (role === "admin") {
    const query =
      `SELECT * FROM ${tasks_table}  WHERE id = ? AND ` + optional_query;
    return connection.query(query, [task_id]);
  }

  const query =
    `SELECT * FROM ${tasks_table}  WHERE id = ? AND user_id = ? AND ` +
    optional_query;
  const [result] = await connection.query(query, [task_id, user_id]);

  if (result.length === 0) {
    const error = new Error("La tarea no existe o no tienes acceso a ella");
    error.status = 403;
    throw error;
  }

  return result;
}

async function getTaskByUserIdService(user_id, user_data) {
  const { role } = user_data;
  if (role === "admin") {
    const query = `SELECT * FROM ${tasks_table}  WHERE user_id = ?;`;
    return connection.query(query, [user_id]);
  } else {
    const error = new Error("La tarea no existe o no tienes acceso a ella");
    error.status = 403;
    throw error;
  }
}

async function getFilteredTasksService(
  full_name,
  date,
  user_data,
  optional_query = true,
) {
  try {
    const { id: user_id, role } = user_data;

    const full_name_query = full_name
      ? `user_id = (SELECT DISTINCT id FROM ${users_table} WHERE INSTR(full_name, ? ))`
      : true;

    const split_date = date?.split(" ") ?? "";

    const date_query_structure =
      split_date.length === 2
        ? `task_Date BETWEEN ? AND ?`
        : `MONTHNAME(task_date) = ?`;

    const date_query = date ? date_query_structure : true;

    if (role === "admin") {
      const query =
        `SELECT t.*,u.full_name,sec_to_time(sum(time_to_Sec(worked_hours)) over(ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)) as incremental_total,
      sec_to_time(sum(time_to_Sec(worked_hours)) over())  as total FROM ${tasks_table} t ` +
        ` INNER JOIN ${users_table} u ON u.id = t.user_id ` +
        ` WHERE ${full_name_query} AND ${date_query} AND ` +
        optional_query +
        " order by task_date ;";
      const params = [full_name ?? null, ...(split_date ?? null)].filter(
        Boolean,
      );

      return connection.execute(query, params);
    }
    const query =
      `SELECT t.*,u.full_name,sec_to_time(sum(time_to_Sec(worked_hours)) over(ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)) as incremental_total,
      sec_to_time(sum(time_to_Sec(worked_hours)) over())  as total FROM ${tasks_table} t ` +
      ` INNER JOIN ${users_table} u ON u.id = t.user_id ` +
      ` WHERE ${full_name_query} AND ${date_query} AND ` +
      optional_query +
      " AND user_id = ?  order by task_date ";
    const params = [full_name ?? null, ...(split_date ?? null), user_id].filter(
      Boolean,
    );

    return connection.execute(query, params);
  } catch (error) {
    throw error;
  }
}

async function addTaskService(
  {
    company,
    project,
    task_type,
    task_description,
    entry_time,
    exit_time,
    hour_type,
    lunch_hours,
    status,
    task_date,
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

    const query = `INSERT INTO ${tasks_table} (id,company,project,task_type,task_description,entry_time,exit_time,hour_type,lunch_hours,status,user_id,task_date,worked_hours) VALUES (UUID(),?,?,?,?,?,?,?,?,?,?,?,timediff(?, ?));`;
    return connection.query(query, [
      company,
      project,
      task_type,
      task_description,
      entry_time,
      exit_time,
      hour_type,
      lunch_hours,
      status,
      user_id,
      task_date,
      exit_time,
      entry_time,
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
  getTaskByIdService,
  getTaskByUserIdService,
  getFilteredTasksService,
  addTaskService,
  updateTaskService,
  deleteTaskService,
};

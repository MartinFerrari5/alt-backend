// src/controllers/status.controller.js

import {
  getAllTasksService,
  getFilteredTasksService,
  getTaskByIdService,
  updateTaskService,
} from "../services/tasks/tasks.service.js";
import { exportToExcel } from "../utils/export_excel.js";

async function getExportedTasksController(req, res, next) {
  try {
    const optional_query = "status=1";
    const [tasks] = await getAllTasksService(req.user, optional_query);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function getExportedTasksByIdController(req, res, next) {
  try {
    const { task_id } = req.query;
    const optional_query = "status=1";
    const [tasks] = await getTaskByIdService(task_id, req.user, optional_query);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function getFilteredExportedTasksController(req, res) {
  try {
    const { fullname: full_name, date } = req.query;

    const [tasks] = await getFilteredTasksService(
      full_name,
      date,
      req.user,
      "status=1",
    );

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(error.message || 500).json(error.message);
  }
}

async function downloadExportedTasksController(req, res, next) {
  try {
    const { tasks } = req.body;

    // const optional_query = "status=1";
    // req.user = { id: "e9755413-e0d3-11ef-ad66-047c1614f0fd", role: "admin" };
    // const [tasks] = await getAllTasksService(req.user, optional_query);
    
    const formatted_tasks = tasks.map((task) => {
      const {company: Compania, project: Proyecto, task_type: Tipo_Tarea,
        task_description: Descripcion, entry_time: Hora_Entrada, exit_time: Hora_Salida,
        hour_type: Tipo_Hora, lunch_hours: Horas_Descanso, status: Estado, user_id: ID_Usuario,
        task_date: Fecha
      } = task;
      return {
        Compania,
        Proyecto,
        Tipo_Tarea,
        Descripcion,
        Hora_Entrada,
        Hora_Salida,
        Tipo_Hora,
        Horas_Descanso,
        Estado,
        ID_Usuario,
        Fecha
      }
    });
    
    exportToExcel(res, formatted_tasks);
    // res.status(200).json({ tasks });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function updateStatusController(req, res, next) {
  try {
    const { task_id } = req.query;

    await updateTaskService(task_id, req.body, req.user);

    res.status(200).json({ message: "Tarea exportada" });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

export {
  getExportedTasksController,
  getExportedTasksByIdController,
  downloadExportedTasksController,
  getFilteredExportedTasksController,
  updateStatusController,
};

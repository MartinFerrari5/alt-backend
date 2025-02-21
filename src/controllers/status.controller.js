// src/controllers/status.controller.js

import {
  deleteTaskService,
  getAllTasksService,
  getFilteredTasksService,
  getTaskByIdService,
  updateTaskService
} from "../services/tasks/tasks.service.js";
import { sendEmailToRRHH } from "../utils/email_rrhh.js";
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
    const { company, project, fullname: full_name, date, status } = req.query;

    const [tasks] = await getFilteredTasksService(
      company,
      project,
      full_name,
      date,
      status,
      req.user,
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
      const {
        company: Compania,
        project: Proyecto,
        task_type: Tipo_Tarea,
        task_description: Descripcion,
        entry_time: Hora_Entrada,
        exit_time: Hora_Salida,
        hour_type: Tipo_Hora,
        lunch_hours: Horas_Descanso,
        task_date: Fecha,
        worked_hours: Horas_Trabajadas,
        incremental_total: Incremental,
        full_name: Nombre_Apellido,
        total: Horas_Total
      } = task;
      return {
        Fecha,
        Nombre_Apellido,
        Compania,
        Proyecto,
        Tipo_Tarea,
        Descripcion,
        Hora_Entrada,
        Hora_Salida,
        Tipo_Hora,
        Horas_Descanso,
        Horas_Trabajadas,
        Incremental,
        Horas_Total
      };
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

    res.status(200).json({ message: "Tarea finalizada" });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function sendToRRHHTasksController(req,res){
  try {
    const { company,project,date} = req.query;
    const {full_name} = req.user;
    const tasks = req.body.tasks
    
    const tasks_ids = tasks.map(task => task.id)

    const status = {status:1}
   

    await updateTaskService( tasks_ids,status, req.user);
    await sendEmailToRRHH(company ,project  ,date ,full_name)

    res.status(200).json({ message: "Tarea enviada a Recursos Humanos" });
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
  sendToRRHHTasksController
};

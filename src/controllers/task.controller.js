//src/controllers/task.controller.js

import { taskSchema } from "../guards/schema.guards.js";
import {
  addTaskService,
  deleteTaskService,
  getAllTasksService,
  getFilteredTasksService,
  getTaskByIdService,
  getTaskByUserIdService,
  updateTaskService,
} from "../services/tasks/tasks.service.js";
import { exportToExcel } from "../utils/export_excel.js";

async function getTasksController(req, res) {
  try {
    const [tasks] = await getAllTasksService(req.user);

    res.status(200).json({ tasks, id: req.user.id });
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function getTaskByIdController(req, res, next) {
  try {
    const { task_id } = req.query;
    const [task] = await getTaskByIdService(task_id, req.user);
    res.status(200).json({ task });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function getTaskByUserIdController(req, res, next) {
  try {
    const { user_id } = req.query;
    const [tasks] = await getTaskByUserIdService(user_id, req.user);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function getFilteredTasksController(req, res, next) {
  try {
    const { fullname: full_name, date } = req.query;

    const [tasks] = await getFilteredTasksService(full_name, date, req.user);

    res.status(200).json({ tasks });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function addTaskController(req, res) {
  try {
    const { error } = taskSchema.validate(req.body);

    if (error) {
      return res.status(400).json(error.message);
    }
   
     const [id] = await addTaskService(req.body, req.user.id);
    res.status(200).json({ message: "Tarea Creada",task: {id:id[0].id, ...req.body} });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function updateTaskController(req, res, next) {
  try {
    const { task_id } = req.query;

    await updateTaskService(task_id, req.body, req.user);

    res.status(200).json({ message: "Tarea actualizada" });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function deleteTaskController(req, res) {
  try {
    const { task_id } = req.query;
    
    await deleteTaskService(task_id, req.user);
    res.status(200).json({ message: "Tarea Eliminada" });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

export {
  getTasksController,
  getTaskByIdController,
  getTaskByUserIdController,
  getFilteredTasksController,
  addTaskController,
  updateTaskController,
  deleteTaskController,
};

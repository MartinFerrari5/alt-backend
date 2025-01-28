import { connection } from "../database/connection.js";
import { taskSchema } from "../guards/schema.guards.js";
import {
  addTaskService,
  getAllTasksService,
  updateTaskService,
} from "../services/tasks/tasks.service.js";

async function getTasksController(req, res) {
  try {
    const [tasks] = await getAllTasksService();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

async function addTaskControler(req, res) {
  try {
    const { error } = taskSchema.validate(req.body);

    if (error) {
      return res.status(400).json(error.message);
    }

    await addTaskService(req.body);
    res.status(200).json({ message: "Tarea Creada" });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function updateTaskController(req, res, next) {
  try {
    const { task_id } = req.params;

    await updateTaskService(task_id, req.body);

    res.status(200).json({ message: "Tarea actualizada" });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

export { getTasksController, addTaskControler, updateTaskController };

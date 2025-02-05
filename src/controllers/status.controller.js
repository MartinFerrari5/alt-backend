import {
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
} from "../services/tasks/tasks.service.js";

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
    const { task_id } = req.params;
    const optional_query = "status=1";
    const [tasks] = await getTaskByIdService(task_id, req.user, optional_query);
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

async function updateStatusController(req, res, next) {
  try {
    const { task_id } = req.params;

    await updateTaskService(task_id, req.body, req.user);

    res.status(200).json({ message: "Tarea exportada" });
  } catch (error) {
    res.status(error.status || 500).json(error.message);
  }
}

export {
  getExportedTasksController,
  getExportedTasksByIdController,
  updateStatusController,
};

//src/routes/task.routes.js

import { Router } from "express";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
import {
  getTasksController,
  addTaskController,
  updateTaskController,
  deleteTaskController,
  getTaskByIdController,
  getTaskByUserIdController,
  getFilteredTasksController,
} from "../controllers/task.controller.js";

const router = Router();

//  Obtener todas las tareas del usuario
router.get(
  "/",
  authenticateToken,
  authorize(["admin", "user"]),
  getTasksController,
);

// Obtener tareas por id
router.get(
  "/task/:task_id",
  authenticateToken,
  authorize(["admin", "user"]),
  getTaskByIdController,
);

// Obtener tareas por id del usuario
router.get(
  "/user/:user_id",
  authenticateToken,
  authorize(["admin"]),
  getTaskByUserIdController,
);

// Publicar una tarea
router.post(
  "/",
  authenticateToken,
  authorize(["admin", "user"]),
  addTaskController,
);

// Obtener tareas filtradas: por fecha de creacion y/o nombre y apellido del usuario
router.get(
  "/filtertasks",
  authenticateToken,
  authorize(["admin"]),
  getFilteredTasksController,
);

// Actualizar una tarea
router.put(
  "/:task_id",
  authenticateToken,
  authorize(["admin", "user"]),
  updateTaskController,
);

// Eliminar una tarea
router.delete(
  "/:task_id",
  authenticateToken,
  authorize(["admin", "user"]),
  deleteTaskController,
);

export default router;

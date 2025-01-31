import { Router } from "express";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
import {
  getTasksController,
  addTaskController,
  updateTaskController,
  deleteTaskController,
  getTaskByIdController,
  getTaskByUserIdController,
  getTaskByDateController,
  getTaskByUserNameController,
} from "../controllers/task.controller.js";

const router = Router();

//  Obtener todas las tareas
router.get("/", authenticateToken, authorize(["admin"]), getTasksController);

// Obtener tareas por id
router.get(
  "/:task_id",
  authenticateToken,
  authorize(["admin", "employee"]),
  getTaskByIdController,
);

// Obtener tareas por id del usuario
router.get(
  "/user/:user_id",
  authenticateToken,
  authorize(["admin"]),
  getTaskByUserIdController,
);

// Obtener tareas por nombre y/o apellido del usuario
router.post(
  "/username",
  authenticateToken,
  authorize(["admin"]),
  getTaskByUserNameController,
);

// Publicar una tarea
router.post(
  "/",
  authenticateToken,
  authorize(["admin", "employee"]),
  addTaskController,
);

// Obtener tareas por fecha de creacion
router.post(
  "/date",
  authenticateToken,
  authorize(["admin", "employee"]),
  getTaskByDateController,
);

// Actualizar una tarea
router.put(
  "/:task_id",
  authenticateToken,
  authorize(["admin", "employee"]),
  updateTaskController,
);

// Eliminar una tarea
router.delete(
  "/:task_id",
  authenticateToken,
  authorize(["admin", "employee"]),
  deleteTaskController,
);

export default router;

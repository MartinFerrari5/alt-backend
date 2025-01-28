import { Router } from "express";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
import {
  getTasksController,
  addTaskController,
  updateTaskController,
  deleteTaskController,
} from "../controllers/task.controller.js";

const router = Router();

router.get("/", authenticateToken, authorize(["admin"]), getTasksController);

router.post(
  "/",
  authenticateToken,
  authorize(["admin", "employee"]),
  addTaskController,
);

router.put(
  "/:task_id",
  authenticateToken,
  authorize(["admin", "employee"]),
  updateTaskController,
);

router.delete(
  "/:task_id",
  authenticateToken,
  authorize(["admin", "employee"]),
  deleteTaskController,
);

export default router;

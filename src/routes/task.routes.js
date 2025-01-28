import { Router } from "express";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
import {
  getTasksController,
  addTaskControler,
  updateTaskController,
} from "../controllers/task.controller.js";

const router = Router();

router.get(
  "/",
  authenticateToken,
  authorize(["admin", "employee"]),
  getTasksController,
);

router.post(
  "/",
  authenticateToken,
  authorize(["admin", "employee"]),
  addTaskControler,
);

router.put(
  "/:task_id",
  authenticateToken,
  authorize(["admin", "employee"]),
  updateTaskController,
);

router.delete("/:task_id", authenticateToken, authorize(["admin", "employee"]));

export default router;

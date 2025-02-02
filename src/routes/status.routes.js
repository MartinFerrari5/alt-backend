import { Router } from "express";
import {
  getExportedTasksByIdController,
  getExportedTasksController,
  updateStatusController,
} from "../controllers/status.controller.js";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
const router = Router();

router.get(
  "/",
  authenticateToken,
  authorize(["admin", "user"]),
  getExportedTasksController,
);

router.get(
  "/:task_id",
  authenticateToken,
  authorize(["admin", "user"]),
  getExportedTasksByIdController,
);

router.put(
  "/:task_id",
  authenticateToken,
  authorize(["admin", "employee"]),
  updateStatusController,
);

export default router;

//src/routes/status.routes.js

import { Router } from "express";
import {
  downloadExportedTasksController,
  getExportedTasksByIdController,
  getExportedTasksController,
  getFilteredExportedTasksController,
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
  "/task",
  authenticateToken,
  authorize(["admin", "user"]),
  getExportedTasksByIdController,
);

router.post(
  /**
   * ?  YA ES UN POST
   * */
  "/download",
  // authenticateToken,
  // authorize(["admin", "user"]),
  downloadExportedTasksController,
);

// Obtener tareas filtradas: por fecha de creacion y/o nombre y apellido del usuario
router.get(
  "/filtertasks",
  authenticateToken,
  authorize(["admin", "user"]),
  getFilteredExportedTasksController,
);

router.put(
  "/",
  authenticateToken,
  authorize(["admin", "user"]),
  updateStatusController,
);

export default router;

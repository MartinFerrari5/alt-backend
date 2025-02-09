//src/routes/status.routes.js

import { Router } from "express";
import {
  downloadExportedTasksController,
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

router.put(
  "/",
  authenticateToken,
  authorize(["admin", "user"]),
  updateStatusController,
);

export default router;

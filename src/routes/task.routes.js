import { Router } from "express";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
import { getTasksController,addTaskControler } from "../controllers/task.controller.js";

const router = Router();

router.get(
    "/",
    authenticateToken,
    authorize(["admin", "employee"]),
    getTasksController,
);

router.post("/", authenticateToken, authorize(["admin", "employee"]),addTaskControler);

export default router;
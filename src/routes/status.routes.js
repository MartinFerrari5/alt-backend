import { Router } from "express";
import { updateStatusController } from "../controllers/status.controller.js";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
const router = Router();

router.put("/:task_id", 
        authenticateToken,
        authorize(["admin", "employee"]),
        updateStatusController);

export default router;

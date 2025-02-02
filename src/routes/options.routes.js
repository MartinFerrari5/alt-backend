import { Router } from "express";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
import { getOptionsController } from "../controllers/options.controller.js";

const router = Router();

router.get(
  "/:table",
  authenticateToken,
  authorize(["admin", "user"]),
  getOptionsController,
);

export default router;

//src/routes/options.routes.js

import { Router } from "express";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
import {
  getOptionsController,
  addOptionsController,
} from "../controllers/options.controller.js";

const router = Router();

router.get(
  "/:table",
  authenticateToken,
  authorize(["admin", "user"]),
  getOptionsController,
);

router.post("/", authenticateToken, authorize(["admin"]), addOptionsController);

export default router;

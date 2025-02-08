//src/routes/options.routes.js

import { Router } from "express";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
import {
  getOptionsController,
  addOptionsController,
  updateOptionsController,
  deleteOptionsController
} from "../controllers/options.controller.js";

const router = Router();

router.get(
  "/:table",
  authenticateToken,
  authorize(["admin", "user"]),
  getOptionsController,
);

router.post("/", authenticateToken, authorize(["admin"]), addOptionsController);

router.put("/:options_id", authenticateToken, authorize(["admin"]), updateOptionsController);

router.delete("/:options_id", authenticateToken, authorize(["admin"]), deleteOptionsController);

export default router;

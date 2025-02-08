//src/routes/email.routes.js

import { Router } from "express";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
import {
  addEmailController,
  deleteEmailController,
  getAllEmailsController,
} from "../controllers/email.controller.js";

const router = Router();

router.get(
  "/",
  authenticateToken,
  authorize(["admin"]),
  getAllEmailsController,
);

router.post("/", authenticateToken, authorize(["admin"]), addEmailController);

router.delete(
  "/:email_id",
  authenticateToken,
  authorize(["admin"]),
  deleteEmailController,
);

export default router;

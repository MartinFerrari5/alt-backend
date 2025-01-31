import { Router } from "express";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
import { addEmailController } from "../controllers/email.controller.js";

const router = Router();

router.post("/", authenticateToken,authorize(["admin"]), addEmailController);

export default router;
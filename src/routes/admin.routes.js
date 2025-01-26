import { Router } from "express";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticateToken, authorize(["admin"]));

export default router;

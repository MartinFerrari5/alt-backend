//src/routes/home.routes.js

import { Router } from "express";
import { homeController } from "../controllers/home.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", authenticateToken, homeController);

export default router;

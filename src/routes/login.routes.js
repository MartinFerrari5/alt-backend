//src/routes/login.routes.js

import { Router } from "express";
import { logInUser } from "../controllers/login.controller.js";
import { verifyEmailMiddleware } from "../middleware/email.middleware.js";

const router = Router();

router.post("/", logInUser);

export default router;

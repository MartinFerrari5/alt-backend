//src/routes/login.routes.js

import { Router } from "express";
import { logInUserController } from "../controllers/login.controller.js";

const router = Router();

router.post("/", logInUserController);

export default router;

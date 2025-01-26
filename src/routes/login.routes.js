import { Router } from "express";
import { logInUser } from "../controllers/login.controller.js";

const router = Router();

router.post("/", logInUser);

export default router;

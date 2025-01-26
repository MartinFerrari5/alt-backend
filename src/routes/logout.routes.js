import { Router } from "express";
import { logOutUser } from "../controllers/logout.controller.js";

const router = Router();

router.get("/", logOutUser);

export default router;

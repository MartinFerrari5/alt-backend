import { Router } from "express";
import { logInUser } from "../controllers/login.controller.js";

const router = Router();

// router.get("/", getAllUsers);

router.post("/:user_id",logInUser)

export default router
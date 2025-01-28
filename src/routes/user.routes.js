import { Router } from "express";
import {
  addUserController,
  getAllUsers,
  getUserById,
} from "../controllers/users.controller.js";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", getAllUsers);

router.get("/:user_id", getUserById);

router.post("/", authenticateToken, authorize(["admin"]), addUserController);

export default router;

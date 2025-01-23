import { Router } from "express";
import {
  addUserController,
  getAllUsers,
  getUserById,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", getAllUsers);

router.get("/:user_id", getUserById);

router.post("/", addUserController);

export default router;

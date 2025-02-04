import { Router } from "express";
import {
  addUserController,
  getAllUsersController,
  getUserByIdController,
  
} from "../controllers/users.controller.js";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
import { verifyEmailMiddleware } from "../middleware/email.middleware.js";
import { changePasswordService, sendNewPasswordService } from "../services/users/password.service.js";

const router = Router();

// Obtener todos los usuarios
router.get("/", authenticateToken, authorize(["admin"]), getAllUsersController);

// Obtener un usuario por su ID
router.get(
  "/:user_id",
  authenticateToken,
  authorize(["admin"]),
  getUserByIdController,
);

// Agregar un nuevo usuario
router.post("/", verifyEmailMiddleware(false), addUserController);

// Envio de contraseña nueva
router.post(
  "/newpassword",
  verifyEmailMiddleware(true),
  sendNewPasswordService,
);

// Cambio de contraseña
router.post(
  "/changepassword",
  authenticateToken,
  verifyEmailMiddleware(true),
  changePasswordService,
);

export default router;

//src/routes/options.routes.js

import { Router } from "express";
import { authenticateToken, authorize } from "../middleware/auth.middleware.js";
import {
  getOptionsController,
  addOptionsController,
  updateOptionsController,
  deleteOptionsController,
} from "../controllers/options.controller.js";

const router = Router();

router.get(
  "/",
  authenticateToken,
  authorize(["admin", "user"]),
  getOptionsController,
);
router.get("/reportes", async (req, res) => {
  console.log("hello");
  res.send("Hello, World!");
});
router.post("/", authenticateToken, authorize(["admin"]), addOptionsController);

router.put(
  "/",
  authenticateToken,
  authorize(["admin"]),
  updateOptionsController,
);

router.delete(
  "/",
  authenticateToken,
  authorize(["admin"]),
  deleteOptionsController,
);

export default router;

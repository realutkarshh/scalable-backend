import express from "express";
import {
  createUser,
  getUsers,
  updateUserStatus,
  updateUserRole,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", protect, authorize("admin"), createUser);           // Create user
router.get("/", protect, authorize("admin", "analyst"), getUsers);   // Get all users
router.patch("/:id/status", protect, authorize("admin"), updateUserStatus); // Activate/Deactivate
router.patch("/:id/role", protect, authorize("admin"), updateUserRole);     // Assign/change role

export default router;
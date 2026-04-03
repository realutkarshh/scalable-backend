import express from "express";
import {
  createUser,
  getUsers,
  updateUserStatus,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser); // Create user
router.get("/", getUsers); // Get all users
router.patch("/:id/status", updateUserStatus); // Activate/Deactivate

export default router;
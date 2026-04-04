import express from "express";
import { getSummary } from "../controllers/dashboard.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Protected route
router.get("/summary", protect, getSummary);

export default router;
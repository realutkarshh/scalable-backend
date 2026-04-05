import express from "express";
import { getSummary } from "../controllers/dashboard.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

// All roles can view the dashboard summary
router.get("/summary", protect, authorize("admin", "analyst", "viewer"), getSummary);

export default router;
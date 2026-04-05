import express from "express";
import {
  getSummary,
  getMonthlyTrends,
  getWeeklyTrends,
} from "../controllers/dashboard.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

// All roles can access dashboard endpoints (non-admins see only their own data)
router.get("/summary", protect, authorize("admin", "analyst", "viewer"), getSummary);
router.get("/trends/monthly", protect, authorize("admin", "analyst", "viewer"), getMonthlyTrends);
router.get("/trends/weekly", protect, authorize("admin", "analyst", "viewer"), getWeeklyTrends);

export default router;
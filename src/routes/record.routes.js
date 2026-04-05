import express from "express";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "../controllers/record.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Viewer, Analyst, and Admin can view records
router.get("/", authorize("admin", "analyst", "viewer"), getRecords);

// Only Admin (and Analyst who owns the record — enforced in service) can create/update/delete
router.post("/", authorize("admin", "analyst"), createRecord);
router.patch("/:id", authorize("admin", "analyst"), updateRecord);
router.delete("/:id", authorize("admin"), deleteRecord);

export default router;
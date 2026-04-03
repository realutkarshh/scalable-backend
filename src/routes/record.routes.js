import express from "express";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "../controllers/record.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// All routes protected
router.use(protect);

router.post("/", createRecord);
router.get("/", getRecords);
router.patch("/:id", updateRecord);
router.delete("/:id", deleteRecord);

export default router;
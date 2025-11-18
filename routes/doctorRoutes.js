import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

// Get all doctors (public)
router.get("/", getDoctors);

// Add new doctor (authenticated)
router.post("/", protect, addDoctor);

// Update or delete doctor (authenticated)
router.put("/:id", protect, updateDoctor);
router.delete("/:id", protect, deleteDoctor);

export default router;

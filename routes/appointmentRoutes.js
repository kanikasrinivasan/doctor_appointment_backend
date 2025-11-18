// backend/routes/appointmentRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  bookAppointment,
  getAppointmentsByUser,
  getAppointmentsByDoctor,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

// Book appointment (authenticated)
router.post("/", protect, bookAppointment);

// Get appointments for a patient (authenticated)
router.get("/user/:id", protect, getAppointmentsByUser);

// Get appointments for a doctor (authenticated)
router.get("/doctor/:id", protect, getAppointmentsByDoctor);

// Update appointment (check body.status to approve/cancel)
router.put("/:id", protect, updateAppointment);

// Delete appointment
router.delete("/:id", protect, deleteAppointment);

export default router;

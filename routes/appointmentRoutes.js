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

router.post("/", protect, bookAppointment);
router.get("/user/:id", protect, getAppointmentsByUser);
router.get("/doctor/:id", protect, getAppointmentsByDoctor);
router.put("/:id", protect, updateAppointment);
router.delete("/:id", protect, deleteAppointment);

export default router;

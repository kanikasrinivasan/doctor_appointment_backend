import express from "express";
import {
  getAllUsers,
  deleteUser
} from "../controllers/adminController.js";

import {
  addDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor
} from "../controllers/doctorController.js";

import {
  bookAppointment,
  getAppointmentsByUser,
  getAppointmentsByDoctor,
  updateAppointment,
  deleteAppointment
} from "../controllers/appointmentController.js";

const router = express.Router();

// ------------------- USER ROUTES -------------------
router.get("/users", getAllUsers);
router.delete("/user/:id", deleteUser);

// ------------------- DOCTOR ROUTES -------------------
router.post("/doctor", addDoctor);          // ➕ Create Doctor
router.get("/doctors", getDoctors);         // 📋 Get All Doctors
router.put("/doctor/:id", updateDoctor);    // ✏️ Update Doctor
router.delete("/doctor/:id", deleteDoctor); // ❌ Delete Doctor

// ------------------- APPOINTMENT ROUTES -------------------
router.post("/appointment", bookAppointment);                // ➕ Book Appointment
router.get("/appointments/user/:id", getAppointmentsByUser); // 📋 Get by User
router.get("/appointments/doctor/:id", getAppointmentsByDoctor); // 📋 Get by Doctor
router.put("/appointment/:id", updateAppointment);           // ✏️ Update Appointment
router.delete("/appointment/:id", deleteAppointment);        // ❌ Cancel Appointment

export default router;

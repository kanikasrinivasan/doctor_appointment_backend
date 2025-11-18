import express from "express";

import {
  getAllUsers,
  getAllDoctors,
  getAllAppointments,
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

// ---------------- USER ROUTES ----------------
router.get("/users", getAllUsers);
router.delete("/user/:id", deleteUser);

// ---------------- DOCTOR ROUTES ----------------
router.post("/doctor", addDoctor);
router.get("/doctors", getDoctors);
router.put("/doctor/:id", updateDoctor);
router.delete("/doctor/:id", deleteDoctor);

// ---------------- APPOINTMENT ROUTES ----------------
router.post("/appointment", bookAppointment);
router.get("/appointments/user/:id", getAppointmentsByUser);
router.get("/appointments/doctor/:id", getAppointmentsByDoctor);
router.put("/appointment/:id", updateAppointment);
router.delete("/appointment/:id", deleteAppointment);

export default router;

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addDoctor,
  getDoctors,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/", getDoctors);
router.post("/", protect, addDoctor);
router.put("/:id", protect, updateDoctor);
router.delete("/:id", protect, deleteDoctor);

export default router;

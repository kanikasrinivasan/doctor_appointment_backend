import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/test", (req, res) => {
  return res.status(200).json({ message: "Server awake" });
});

export default router;

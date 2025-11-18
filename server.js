import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

// Initialize app
const app = express();

// ✅ Connect Database
connectDB();

// ✅ Middleware
app.use(express.json()); // Important for POST requests

// ✅ FIXED CORS - ALLOW LOCAL + VERCEL FRONTEND
// 🟢 CORS FIX (Express v5 Safe Version)
const allowedOrigins = [
  "http://localhost:3000",
  "https://doctor-appointment-frontend-plum.vercel.app",
  "https://doctor-appointment-fronte-git-8592f3-kanikasrinivasans-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

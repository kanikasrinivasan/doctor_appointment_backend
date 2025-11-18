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

// Connect Database
connectDB();

// Body Parser
app.use(express.json());

// -------------------------------
// CORS FIX FOR LOCAL + VERCEL
// -------------------------------
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
        callback(new Error("Blocked by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// -------------------------------
// Request Logger
// -------------------------------
app.use((req, res, next) => {
  console.log(`📩 ${req.method} ${req.url}`);
  next();
});

// -------------------------------
// API ROUTES
// -------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);

// -------------------------------
// DEFAULT HOME ROUTE
// -------------------------------
app.get("/", (req, res) => {
  res.send("🚀 Doctor Appointment System API is running successfully!");
});

// -------------------------------
// START SERVER (FIXED FOR RENDER)
// -------------------------------
const PORT = process.env.PORT || 10000;

// IMPORTANT: must use 0.0.0.0 for Render deployment
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

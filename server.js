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

// ✅ Enable CORS
app.use(
  cors({
    origin: "*", // You can replace * with your frontend URL for security (e.g. "http://localhost:3000")
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Request Logger (place before routes)
app.use((req, res, next) => {
  console.log(`📩 ${req.method} ${req.url}`);
  next();
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("🚀 Doctor Appointment System API is running successfully!");
});

// ✅ Error Handling Middleware (optional but useful)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

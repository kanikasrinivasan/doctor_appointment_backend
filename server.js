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
app.use(express.urlencoded({ extended: true }));

// -------------------------------
// ✅ FIXED CORS FOR RENDER + VERCEL
// -------------------------------
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-frontend-vercel-url.vercel.app"
];


// Handle CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS Blocked Origin:", origin);
        callback(new Error("Blocked by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// Handle preflight (OPTIONS) safely for Express v5
app.options(/.*/, cors());

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
// START SERVER (Render Requirement)
// -------------------------------
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

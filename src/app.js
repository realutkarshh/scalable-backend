import express from "express";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import recordRoutes from "./routes/record.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { logger } from "./middlewares/logger.middleware.js";
import cors from "cors";


const app = express();

//CORS for the frontend 
app.use(
  cors({
    origin: "https://frontend-for-scalable-backend-repo.vercel.app",
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Apply logger middleware to all routes
app.use(logger);

// Health check route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// User routes
app.use("/api/users", userRoutes);

// Auth routes
app.use("/api/auth", authRoutes);

// Record routes
app.use("/api/records", recordRoutes);

// Dashboard routes
app.use("/api/dashboard", dashboardRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
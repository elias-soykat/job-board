const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { globalErrorHandler } = require("./utils/errorHandler");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const alertRoutes = require("./routes/alertRoutes");
const { PORT, FRONTEND_URL } = require("./config/env");

const app = express();
app.use(express.json());
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 204,
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/alerts", alertRoutes);
app.use("/", (req, res) => res.json("Welcome!"));

app.use(globalErrorHandler);
require("./config/db");

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

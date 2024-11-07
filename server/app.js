const express = require("express");
const dotenv = require("dotenv");
const { globalErrorHandler } = require("./utils/errorHandler");
const jobRoutes = require("./routes/jobRoutes");
const authRoutes = require("./routes/authRoutes");
const { PORT } = require("./config/env");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/auth", authRoutes);

app.use(globalErrorHandler);
require("./config/db");

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

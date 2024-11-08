const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "A job must have a company name"],
    },
    title: {
      type: String,
      required: [true, "A job must have a title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "A job must have a description"],
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "internship"],
      required: [true, "A job must have a type"],
    },
    status: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Job", jobSchema);

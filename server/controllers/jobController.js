const Job = require("../models/Job");
const { AppError } = require("../utils/errorHandler");
const catchAsync = require("../utils/catchAsync");

exports.getAllJobs = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const totalJobs = await Job.countDocuments();
  const totalPages = Math.ceil(totalJobs / limit);
  const jobs = await Job.find().skip(skip).limit(limit);
  const pagination = {
    totalDocs: totalJobs,
    totalPages,
    currentPage: page,
    itemsPerPage: limit,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };

  res.status(200).json({
    status: "success",
    results: jobs.length,
    pagination,
    data: { jobs },
  });
});

exports.getJob = catchAsync(async (req, res, next) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    return next(new AppError("No job found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      job,
    },
  });
});

exports.createJob = catchAsync(async (req, res) => {
  const newJob = await Job.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      job: newJob,
    },
  });
});

exports.updateJob = catchAsync(async (req, res, next) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    return next(new AppError("No job found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      job,
    },
  });
});

exports.deleteJob = catchAsync(async (req, res, next) => {
  const job = await Job.findByIdAndDelete(req.params.id);

  if (!job) {
    return next(new AppError("No job found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

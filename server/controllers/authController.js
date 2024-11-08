const jwt = require("jsonwebtoken");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");
const { AppError } = require("../utils/errorHandler");
const { sendEmail } = require("../utils/email");
const crypto = require("crypto");
const { createSendToken } = require("../utils/sendToken");
const config = require("../config/env");

exports.register = catchAsync(async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return next(
      new AppError("User with this email address already exists", 400)
    );
  }

  const newUser = await User.create({
    companyName: req.body.companyName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  // Create verification token
  const verificationToken = newUser.createEmailVerificationToken();
  await newUser.save({ validateBeforeSave: false });

  // Send verification email
  const verificationURL = `${config.FRONTEND_URL}/auth/verify-email/${verificationToken}`;
  const message = `Welcome to Job Listing App! Please verify your email by clicking on the following link: ${verificationURL}`;

  try {
    await sendEmail({
      email: newUser.email,
      subject: "Email Verification",
      message,
      html: `<div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #333;">Welcome to Job Board!</h2>
      </div>
      
      <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px;">
        <h3 style="color: #444;">Hello ${newUser.companyName},</h3>
        <p style="color: #666; line-height: 1.6;">
          Thank you for registering with Job Board. Please verify your email address by clicking the button below:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationURL}" 
             style="background-color: #000000; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        
        <p style="color: #666; line-height: 1.6;">
          If the button doesn't work, you can also click this link:
          <a href="${verificationURL}" style="color: #4CAF50;">
            ${verificationURL}
          </a>
        </p>
        
        <p style="color: #666; line-height: 1.6;">
          This verification link will expire in 24 hours.
        </p>
      </div>
      
      <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.9em;">
        <p>If you didn't create an account with Job Board, please ignore this email.</p>
      </div>
    </div>
  `,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    newUser.emailVerificationToken = undefined;
    newUser.emailVerificationExpires = undefined;
    await newUser.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the verification email. Please try again later.",
        500
      )
    );
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // Check if email is verified
  if (!user.isEmailVerified) {
    return next(new AppError("Please verify your email first", 401));
  }

  // Send token
  createSendToken(user, 200, res);
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  // Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  });

  // If token has not expired, and there is user, verify email
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    message: "Email verified successfully",
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  // Get token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // Verify token
  const decoded = jwt.verify(token, config.JWT_SECRET);

  // Check if user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401)
    );
  }

  // Grant access to protected route
  req.user = user;
  next();
});

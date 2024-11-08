const nodemailer = require("nodemailer");
const config = require("../config/env");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: config.EMAIL_USERNAME, pass: config.EMAIL_APP_PASSWORD },
  });

  await transporter.sendMail({
    from: "Job Listing App | No Reply <eliasmd624@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  });
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

module.exports = { sendEmail, isValidEmail };

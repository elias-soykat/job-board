const catchAsync = require("../utils/catchAsync");
const { sendEmail, isValidEmail } = require("../utils/email");

exports.sendAlerts = catchAsync(async (req, res) => {
  const { subject, message, candidates } = req.body;

  if (
    !subject ||
    !message ||
    !Array.isArray(candidates) ||
    candidates.length === 0
  ) {
    return res.status(400).json({
      error:
        "Invalid request. Please provide subject, message, and at least one candidate.",
    });
  }

  const invalidEmails = candidates.filter((c) => !isValidEmail(c.email));
  if (invalidEmails.length > 0) {
    return res.status(400).json({
      error: "Invalid email format found in candidates list.",
      invalidEmails: invalidEmails.map((c) => c.email),
    });
  }

  const emailPromises = candidates.map(async (candidate) => {
    const emailContent = {
      email: candidate.email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello ${candidate.name},</h2>
          <div style="margin: 20px 0;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <div style="color: #666; font-size: 12px; margin-top: 20px;">
            <p>This is an automated job alert. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    };

    return sendEmail(emailContent);
  });

  await Promise.all(emailPromises);
  res.status(200).json({
    message: "Job alerts sent successfully",
    recipientCount: candidates.length,
  });
});

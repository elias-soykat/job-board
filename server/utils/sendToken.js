const config = require("../config/env");
const jwt = require("jsonwebtoken");

const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id, companyName: user.companyName },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_EXPIRES_IN,
    }
  );

  // Remove password from output
  user.password = undefined;

  return res
    .status(statusCode)
    .json({ status: "success", token, data: { user } });
};

module.exports = { createSendToken };

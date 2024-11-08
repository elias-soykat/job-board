const express = require("express");
const router = express.Router();
const { sendAlerts } = require("../controllers/alertController");
const { protect } = require("../controllers/authController");

router.post("/", protect, sendAlerts);

module.exports = router;

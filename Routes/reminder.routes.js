const express = require("express");
const router = express.Router();
const { sendServiceReminder } = require("../Controllers/reminder.controller");

router.post("/send", sendServiceReminder);

module.exports = router;
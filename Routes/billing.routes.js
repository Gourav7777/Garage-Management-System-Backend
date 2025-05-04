const express = require("express");
const router = express.Router();
const { generateBill } = require("../Controllers/billing.controller");

router.post("/generate/:jobCardId", generateBill);

module.exports = router;

const express = require("express");
const router = express.Router();
const { generateBill,getBillByJobCardId } = require("../Controllers/billing.controller");
const authGarage = require("../Middlewares/garageauth.middleware");

router.use(authGarage);
router.post("/generate/:jobCardId", generateBill);
router.get("/get/:jobCardId", getBillByJobCardId);

module.exports = router;

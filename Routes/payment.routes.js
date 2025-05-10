// Routes/payment.routes.js
const express = require("express");
const router = express.Router();
const paymentController = require("../Controllers/payment.controller");

router.post("/create-order", paymentController.createOrder);

module.exports = router;

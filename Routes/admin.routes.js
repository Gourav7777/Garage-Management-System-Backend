const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/admin.controller");

// Admin routes
router.post("/login", adminController.login);
router.put("/update/password", adminController.updatePassword);
router.get("/garages/pending", adminController.getPendingGarages);
router.put("/garages/approve/:id", adminController.approveGarage);

module.exports = router;

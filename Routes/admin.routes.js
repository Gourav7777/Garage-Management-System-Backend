const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/admin.controller");

// Admin routes
router.post("/login", adminController.login);
router.put("/update/password", adminController.updatePassword);
router.get("/garages/pending", adminController.getPendingGarages);
router.put("/garages/approve/:id", adminController.approveGarage);

// Inventory
router.post('/inventory/add', adminController.addPart);
router.put('/inventory/update/:id', adminController.updatePart);

// Insurance
router.post('/insurance/add', adminController.addInsurance);
router.get('/insurance/expiring', adminController.getExpiringInsurance);
module.exports = router;

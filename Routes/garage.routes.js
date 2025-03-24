const express = require("express");
const { createGarage,getAllGarages,updateGarage,deleteGarage } = require("../Contorller/garage.controller");


const router = express.Router();

// Create Garage (Super Admin Only)
router.post("/create", createGarage);
router.get("/allgarages", getAllGarages);
router.put("/allgarages/:id", updateGarage);
router.delete("/allgarages/:id", deleteGarage);
module.exports = router;
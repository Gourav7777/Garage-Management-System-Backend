const express = require("express");
const {
  createJobCard,
  getJobCardsByGarage,
  getJobCardById,
  updateJobCard,
  deleteJobCard,
  assignEngineer,
  updateJobStatus,
} = require("../Controllers/jobCard.controller");
const upload = require("../Middlewares/upload")
const authGarage = require("../Middlewares/garageauth.middleware");

const router = express.Router();

router.use(authGarage);
// Job Card Routes

// Create Job Card


// with images
router.post("/add", upload.fields([
  { name: "images", maxCount: 5 },
  { name: "video", maxCount: 1 }
]), createJobCard)

router.get("/garage/:garageId", getJobCardsByGarage); // Get all Job Cards for a Garage
router.get("/:jobCardId", getJobCardById); // Get Single Job Card
router.put("/:jobCardId", updateJobCard); // Update Job Card
router.delete("/:jobCardId", deleteJobCard); // Delete Job Card

// Engineer & Status Management
router.put("/assign-engineer/:jobCardId", assignEngineer); // Assign Engineer
router.put("/update-status/:jobCardId", updateJobStatus); // Update Job Status

module.exports = router;

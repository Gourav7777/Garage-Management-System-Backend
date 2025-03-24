const mongoose = require("mongoose");

const GarageSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Admin Password
  approved: { type: Boolean, default: true }, // Super admin approves it
}, { timestamps: true });

const Garage = mongoose.model("Garage", GarageSchema);
module.exports = Garage;

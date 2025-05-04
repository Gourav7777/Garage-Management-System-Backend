const mongoose = require("mongoose");

const partSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  pricePerUnit: Number,
  totalPrice: Number
});

const serviceSchema = new mongoose.Schema({
  name: String,
  engineer: String,
  laborCost: Number,
  status: String
});

const billSchema = new mongoose.Schema({
    jobCardId: { type: mongoose.Schema.Types.ObjectId, ref: "JobCard", required: true },
    garageId: { type: mongoose.Schema.Types.ObjectId, ref: "Garage", required: true },
  
    invoiceNo: String,
    billingDate: { type: Date, default: Date.now },
  
    parts: [partSchema],
    services: [serviceSchema],
  
    totalPartsCost: Number,
    totalLaborCost: Number,
    subTotal: Number,
    gst: Number,
    gstPercentage: Number, // ✅ Add this field
    discount: Number,
    finalAmount: Number,
  
    paymentStatus: { type: String, default: "Unpaid" }
  });

module.exports = mongoose.model("Bill", billSchema);

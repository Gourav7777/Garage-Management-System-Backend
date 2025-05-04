const Bill = require("../Model/bill.model");
const JobCard = require("../Model/jobCard.model");

const generateBill = async (req, res) => {
    try {
      const { jobCardId } = req.params;
      const { parts, services, discount = 0, gstPercentage = 18 } = req.body;
  
      const jobCard = await JobCard.findById(jobCardId);
      if (!jobCard) return res.status(404).json({ message: "Job Card not found" });
  
      // ✅ Ensure quality check approval before billing
      if (!jobCard.qualityCheck || !jobCard.qualityCheck.billApproved) {
        return res.status(403).json({ message: "Quality check not approved. Bill cannot be generated." });
      }
  
      // Calculate totals
      const totalPartsCost = parts.reduce((sum, p) => sum + (p.quantity * p.pricePerUnit), 0);
      const totalLaborCost = services.reduce((sum, s) => sum + s.laborCost, 0);
      const subTotal = totalPartsCost + totalLaborCost;
  
      const gst = parseFloat(((subTotal * gstPercentage) / 100).toFixed(2));
      const finalAmount = subTotal + gst - discount;
  
      const invoiceNo = `INV-${Date.now()}`;
  
      const newBill = new Bill({
        jobCardId,
        garageId: jobCard.garageId,
        invoiceNo,
        parts,
        services,
        totalPartsCost,
        totalLaborCost,
        subTotal,
        gst,
        gstPercentage, // ✅ Save this
        discount,
        finalAmount
      });
  
      await newBill.save();
  
      res.status(201).json({ message: "Bill generated successfully", bill: newBill });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };
  
  module.exports = { generateBill };
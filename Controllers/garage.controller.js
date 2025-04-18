const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Garage = require("../Model/garage.model")

const createGarage = async (req, res) => {
  try {
    const { name, address, phone, email, password } = req.body;

    const existingGarage = await Garage.findOne({ email });
    if (existingGarage) {
      return res.status(400).json({ message: "Garage already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newGarage = new Garage({
      name,
      address,
      phone,
      email,
      password: hashedPassword,
    });

    await newGarage.save();

    res.status(201).json({
      message: "Garage created. Waiting for admin approval.",
      garage: newGarage,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const garageLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const garage = await Garage.findOne({ email });

    if (!garage) {
      return res.status(404).json({ message: "Garage not found" });
    }

    if (!garage.approved) {
      return res.status(403).json({ message: "Garage not approved by admin" });
    }

    const isMatch = await bcrypt.compare(password, garage.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create token
    const token = jwt.sign(
      { garageId: garage._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      garage,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getAllGarages = async (req, res) => {
    try {
      const garages = await Garage.find();
      res.status(200).json({ message: "Garages retrieved", garages });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };

  const updateGarage = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, address, phone, email } = req.body;
  
      const updatedGarage = await Garage.findByIdAndUpdate(
        id,
        { name, address, phone, email },
        { new: true }
      );
  
      if (!updatedGarage) {
        return res.status(404).json({ message: "Garage not found" });
      }
  
      res.status(200).json({ message: "Garage updated successfully", updatedGarage });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };
  

  const deleteGarage = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedGarage = await Garage.findByIdAndDelete(id);
  
      if (!deletedGarage) {
        return res.status(404).json({ message: "Garage not found" });
      }
  
      res.status(200).json({ message: "Garage deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };
  

module.exports = {createGarage,garageLogin, getAllGarages,updateGarage,deleteGarage}
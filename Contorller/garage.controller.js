const Garage = require("../Model/garage.model")

const createGarage= async(req,res)=>{
  
    try {
        // Check if the logged-in user is Super Admin
        // if (req.user.role !== "super_admin") {
        //   return res.status(403).json({ message: "Access denied" });
        // }
    
        const { name, address, phone, email, password } = req.body;

        // Check if garage already exists
        const existingGarage = await Garage.findOne({ email });
        if (existingGarage) {
          return res.status(400).json({ message: "Garage already exists" });
        }
    
        // Create new garage (Garage Admin details inside)
        const newGarage = new Garage({ name, address, phone, email, password });
        await newGarage.save();
    
        // res.status(201).json({ message: "Garage created. Waiting for approval.", garage: newGarage });
        res.status(201).json({ message: "Garage created", garage: newGarage })
      } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
      }
}

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
  

module.exports = {createGarage,getAllGarages,updateGarage,deleteGarage}
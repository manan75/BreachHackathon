const express = require("express");
const Vehicle = require("../Models/VehicleModel");
const router = express.Router();

// Get vehicle stats
router.get("/admin/vehicle-stats", async (req, res) => {
   try {
      const total = await Vehicle.countDocuments();
      const rented = await Vehicle.countDocuments({ status: "rented" });
      const available = await Vehicle.countDocuments({ status: "available" });
      const maintenance = await Vehicle.countDocuments({ status: "maintenance" });
        console.log(total)
      res.json({ total, rented, available, maintenance });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
   }
});


router.get("/admin/vehicles", async (req, res) => {
   try {
      const vehicles = await Vehicle.find().populate("rentalStationId"); // Populate rental station details if needed
      res.json(vehicles);
   } catch (error) {
      console.error("Error fetching vehicles:", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

module.exports = router;

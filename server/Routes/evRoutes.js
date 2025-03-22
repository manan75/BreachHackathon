const express = require("express");
const router = express.Router();
const EV = require("../Models/evModel"); // Import the EV model

// Fetch EV vehicles
router.get("/admin/ev-vehicles", async (req, res) => {
   try {
      const evVehicles = await EV.find({});
      res.json(evVehicles);
   } catch (error) {
      console.error("Error fetching EV vehicles", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
});

module.exports = router;

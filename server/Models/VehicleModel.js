const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  model: { type: String, required: true },
  type: { type: String, enum: ["2-wheeler", "4-wheeler"], required: true },
  availability: { type: Boolean, default: true },
  status: { type: String, enum: ["available", "rented", "maintenance"], default: "available" },
  rentalStationId: { type: mongoose.Schema.Types.ObjectId, ref: "RentalStation" },
});

module.exports = mongoose.model("Vehicle", VehicleSchema);

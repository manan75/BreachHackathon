require("dotenv").config();
const mongoose = require("mongoose");
const Vehicle = require("./Models/VehicleModel");

const MONGO_URI = process.env.MONGO_URL;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000,  // Increase timeout to 50s
  socketTimeoutMS: 45000,          // Increase socket timeout
  connectTimeoutMS: 45000,         // Increase connection timeout
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


const vehicles = [
  { model: "Honda Activa", type: "2-wheeler", availability: true, status: "available" },
  { model: "Yamaha FZ", type: "2-wheeler", availability: true, status: "available" },
  { model: "Royal Enfield", type: "2-wheeler", availability: false, status: "rented" },
  { model: "Maruti Swift", type: "4-wheeler", availability: true, status: "available" },
  { model: "Hyundai i20", type: "4-wheeler", availability: false, status: "maintenance" },
  { model: "Tata Nexon EV", type: "4-wheeler", availability: true, status: "available" },
  { model: "KTM Duke 390", type: "2-wheeler", availability: false, status: "rented" }
];

const insertVehicles = async () => {
  try {
    await Vehicle.insertMany(vehicles);
    console.log("Vehicles inserted successfully!");
  } catch (error) {
    console.error("Error inserting vehicles:", error);
  } finally {
    mongoose.connection.close();
  }
};

insertVehicles();

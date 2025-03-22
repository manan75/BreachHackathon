const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    name: String,
    email: String,
    contact: String,
  },
  vehicle: {
    model: String,
    type: String, // 2-wheeler or 4-wheeler
  },
  transaction: {
    orderId: String,
    paymentId: String,
    amount: Number,
    currency: String,
    status: { type: String, enum: ["Success", "Failed"], default: "Success" },
    timestamp: { type: Date, default: Date.now },
  },
});

module.exports = mongoose.model("Booking", bookingSchema);

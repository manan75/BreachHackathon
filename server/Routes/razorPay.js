const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();


const router = express.Router();

// Initialize Razorpay with API credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Use environment variables for security
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create an order before payment
router.post("/create-order", async (req, res) => {
  try {
    const { rentAmount, currency } = req.body;
    const fixedDeposit = 1000; // Fixed deposit amount
    const totalAmount = rentAmount + fixedDeposit;

    const options = {
      amount: totalAmount * 100, // Convert INR to paisa
      currency: currency || "INR",
      receipt: `order_rcptid_${Math.floor(Math.random() * 1000000)}`,
    };

    const order = await razorpay.orders.create(options);
    
    res.json({
      id: order.id, // Razorpay order ID
      amount: totalAmount * 100, // Amount in paisa
      currency: order.currency,
      rentAmount,
      fixedDeposit,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Verify payment after successful transaction
router.post("/verify-payment", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true, paymentId: razorpay_payment_id });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

module.exports = router;

const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../Models/Booking"); // Import Booking Model
require("dotenv").config();

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Create an order before payment
router.post("/create-order", async (req, res) => {
  try {
    const { rentAmount, currency, user, vehicle } = req.body;
    const fixedDeposit = 1000;
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
      user,
      vehicle,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment and store transaction details
router.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user, vehicle, amount, currency } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Save transaction to database
      const newBooking = new Booking({
        user,
        vehicle,
        transaction: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          amount,
          currency,
          status: "Success",
        },
      });

      await newBooking.save();

      res.json({ success: true, message: "Payment verified & booking saved", paymentId: razorpay_payment_id });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error verifying payment" });
  }
});

module.exports = router;

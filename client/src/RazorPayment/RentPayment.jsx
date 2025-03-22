import React, { useState } from "react";
import axios from "axios";

const RentPayment = () => {
  const [orderDetails, setOrderDetails] = useState(null);

  const handlePayment = async () => {
    try {
      // Step 1: Create Order from Backend
      const { data } = await axios.post("http://localhost:3001/api/razorpay/create-order", {
        rentAmount: 500, // Rent Amount in INR
        currency: "INR",
      });

      setOrderDetails({
        rent: data.rentAmount,
        deposit: data.fixedDeposit,
        total: data.amount / 100,
      });

      const options = {
        key: "rzp_test_jNIj2aDe7PuYoF",
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Rent Payment",
        description: "Rental Service - Vehicle Rent + Security Deposit",
        handler: async (response) => {
          const verifyResponse = await axios.post("http://localhost:3001/api/razorpay/verify-payment", response);

          if (verifyResponse.data.success) {
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "Manan K",
          email: "MananK@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md w-64">
      <h2 className="text-lg font-bold mb-2">Price Summary</h2>
      {orderDetails ? (
        <>
          <p>Rent Amount: ₹{orderDetails.rent}</p>
          <p>Security Deposit: ₹{orderDetails.deposit}</p>
          <p className="font-bold">Total Payable: ₹{orderDetails.total}</p>
        </>
      ) : (
        <p>Click below to see price breakdown</p>
      )}
      <button onClick={handlePayment} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 w-full">
        Pay Rent
      </button>
    </div>
  );
};

export default RentPayment;

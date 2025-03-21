import React from "react";
import axios from "axios";

const RentPayment = () => {
  const handlePayment = async () => {
    try {
      // Step 1: Create Order from Backend
      const { data } = await axios.post("http://localhost:3001/api/razorpay/create-order", {
        amount: 500, // Amount in INR (₹500)
        currency: "INR",
      });

      const options = {
        key: "rzp_test_jNIj2aDe7PuYoF", // Only use Key ID here, NOT Secret Key
        amount: data.amount,
        currency: data.currency,
        order_id: data.id, // This comes from backend
        name: "Rent Payment",
        description: "Pay your monthly rent",
        handler: async (response) => {
          // Step 2: Verify Payment from Backend
          const verifyResponse = await axios.post("http://localhost:3001/api/razorpay/verify-payment", response);

          if (verifyResponse.data.success) {
            alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          } else {
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <button onClick={handlePayment} className="bg-blue-500 text-white px-4 py-2 rounded">
      Pay Rent
    </button>
  );
};

export default RentPayment;

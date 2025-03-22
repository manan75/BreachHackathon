import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/api/bookings");
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="p-4 border rounded shadow-md w-96">
      <h2 className="text-lg font-bold mb-3">Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li key={tx._id} className="mb-2 border-b pb-2">
              <p><strong>Vehicle:</strong> {tx.vehicle.model} ({tx.vehicle.type})</p>
              <p><strong>Amount:</strong> ₹{tx.transaction.amount}</p>
              <p><strong>Status:</strong> {tx.transaction.status}</p>
              <p><strong>Date:</strong> {new Date(tx.transaction.timestamp).toLocaleString()}</p>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                onClick={() => downloadReceipt(tx)}
              >
                Download Receipt
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const downloadReceipt = (tx) => {
  const receiptContent = `
    Receipt for ${tx.user.name}
    ---------------------------------
    Vehicle: ${tx.vehicle.model} (${tx.vehicle.type})
    Amount Paid: ₹${tx.transaction.amount}
    Payment ID: ${tx.transaction.paymentId}
    Status: ${tx.transaction.status}
    Date: ${new Date(tx.transaction.timestamp).toLocaleString()}
  `;

  const blob = new Blob([receiptContent], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Receipt_${tx.transaction.paymentId}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default TransactionHistory;

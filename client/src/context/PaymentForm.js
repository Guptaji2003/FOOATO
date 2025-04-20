import React, { useState } from 'react'

const PaymentForm = () => {
  const [amount, setAmount] = useState("");

  const payNow = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      // Call the backend to create an order
      const response = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to paise (subunits of INR)
          currency: "INR",
          receipt: "receipt#1",
          notes: {},
        }),
      });

      const order = await response.json();

      if (!order.id) {
        alert("Failed to create order. Please try again.");
        return;
      }

      // Razorpay options
      const options = {
        key: "YOUR_KEY_ID", // Replace with your Razorpay key_id
        amount: order.amount,
        currency: order.currency,
        name: "Acme Corp",
        description: "Test Transaction",
        order_id: order.id, // Order ID from the backend
        callback_url: "http://localhost:5000/payment-success", // Success URL
        prefill: {
          name: "Gaurav Kumar", // Replace with user's actual name
          email: "gaurav.kumar@example.com", // Replace with user's actual email
          contact: "9999999999", // Replace with user's actual contact
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Razorpay Payment Gateway Integration</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          payNow();
        }}
      >
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{
            margin: "10px 0",
            padding: "8px",
            width: "200px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#F37254",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}

export default PaymentForm

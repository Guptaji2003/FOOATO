const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

// Replace with your Stripe Secret Key
const stripe = Stripe("sk_test_YourSecretKey");

router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body; // Amount in the smallest currency unit (e.g., cents for USD)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"], // You can specify multiple types if needed
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;

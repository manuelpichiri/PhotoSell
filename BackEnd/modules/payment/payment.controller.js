const Stripe = require("stripe");
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_KEY);

const createPaymentIntent = async (req, res) => {
  try {
    const { amount = 1999, currency = "eur" } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ error: err?.message ?? "Server error" });
  }
};

module.exports = { createPaymentIntent };

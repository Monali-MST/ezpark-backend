var express = require("express");
var cors = require("cors");
var app = express();
const dotenv = require("dotenv");
dotenv.config();

//---------------------stripe CheckoutPayButton API start-----------------------
module.exports = async function stripe_api(req, res) {
  // Set up CORS for the stripe API endpoint
  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );

  // var price = req.body.price;
  // var name = req.body.name;

  var price = 10000;
  var name = "Slot Name: Zone C -20";

  // Initialize Stripe with the private API key
  const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

  // Define slots for the Stripe payment
  const slots = new Map([[1, { priceInCents: price, name: name }]]);

  //Define a route handler for creating a Stripe checkout session
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Accept card payments
      mode: "payment", // Charge the customer immediately
      line_items: req.body.items.map((item) => {
        const slot = slots.get(item.id); // Get the slot based on the ID
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: slot.name, // Use the name of the slot
            },
            unit_amount: slot.priceInCents, // Use the price of the slot
          },
          quantity: item.quantity, // Use the quantity requested by the customer
        };
      }),
      success_url: `http://localhost:3000/successpay`, // Redirect URL after a successful payment
      cancel_url: `http://localhost:3000/closepay`, // Redirect URL after a canceled payment
    });
    res.json({ url: session.url }); // Return the checkout URL to the client
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

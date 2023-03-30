// Import required packages
var express = require("express"); // Express web framework
var bodyparser = require("body-parser"); // Parse request bodies
var cors = require("cors"); // Cross-origin resource sharing middleware
var path = require("path"); // Path manipulation utility
const dotenv = require("dotenv"); // Load environment variables from a .env file

// Create a new Express application
var app = express();

// Import route handlers
const operations_1_route = require("./routes/operations_1_route");

// Load environment variables from a .env file
dotenv.config();


// Set up middleware
app.use(cors()); // Enable cross-origin resource sharing
app.use(bodyparser.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the 'public' directory

// Register route handlers
app.use("/api/user", operations_1_route); 

//---------------------stripe CheckoutPayButton API start-----------------------

// const stripe_api = require("./payment_api/stripe_api");
// stripe_api();

// Set up CORS for the stripe API endpoint
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Initialize Stripe with the private API key
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

// Define slots for the Stripe payment
const slots = new Map([
  [1, { priceInCents: 10000, name: "Slot Name: Zone C -20" }], 
]);

// Define a route handler for creating a Stripe checkout session
app.post("/create-checkout-session", async (req, res) => {
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
});

//---------------------stripe CheckoutPayButton API end-----------------------

// Define a route handler for the root URL
app.get("/", (req, res) => {
  res.json("Hello this is backend of EzPark"); 
});

// Start the server and listen for incoming requests
app.listen(process.env.PORT, () => {
  console.log("server started in port : ", process.env.PORT); 
});


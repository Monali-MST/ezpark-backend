var express = require("express");
var bodyparser = require("body-parser");
var cors = require("cors");
var path = require("path");
const dotenv = require("dotenv");
var app = express();

const operations_1_route = require("./routes/operations_1_route");

dotenv.config();
app.use(cors());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/user", operations_1_route);

//---------------------stripe CheckoutPayButton API start-----------------------

// const stripe_api = require("./payment_api/stripe_api");
// stripe_api();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Slot Name: Zone C -20" }],
]);

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `http://localhost:3000/successpay`,
      cancel_url: `http://localhost:3000/closepay`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//---------------------stripe CheckoutPayButton API end-----------------------
app.get("/", (req, res) => {
  res.json("Hello this is backend of EzPark");
});

app.listen(process.env.PORT, () => {
  console.log("server started in port : ", process.env.PORT);
});


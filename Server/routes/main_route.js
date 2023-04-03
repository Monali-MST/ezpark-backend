const express = require("express");
const router = express.Router();

var stripe_api = require("../payment_api/stripe_api");

router.post("/create-checkout-session", async (req, res) => {
  stripe_api(req, res);
});

module.exports = router;

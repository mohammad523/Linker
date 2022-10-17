/** @format */
require("dotenv");

const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const config = require("config");
const { v4: uuid } = require("uuid");

const privateKey = process.env.STRIPE_PRIVATE_KEY;

const stripe = require("stripe")(
	"sk_test_51LtSimCZreCAdwFJH2RPenInaovUKZBSIPh9kl1hEXg98g9tILfKB3vae4IQJVHyYsDsTTDrdL4ykmENTPmXRaII006nyPL5Bt"
);

router.post("/", async (req, res) => {
	const { product, token } = req.body;

	return stripe.customers
		.create({
			email: token.email,
			source: token.id,
		})
		.then((customer) => {
			stripe.charges.create({
				amount: product.price,
				currency: "usd",
				customer: customer.id,
				receipt_email: token.email,
				description: "Linker Regristration Fee",
			});
		})
		.then((result) => res.status(200).json(result))
		.catch((err) => console.log(err));
});

module.exports = router;

/** @format */
require("dotenv").config();

const express = require("express");
const router = express.Router();
const { check, body, validationResult } = require("express-validator");
const { v4: uuid } = require("uuid");
const auth = require("../../config/middleware/auth");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const Payment = require("../../models/Payment");
const User = require("../../models/User");

const privateKey = process.env.STRIPE_PRIVATE_KEY;

// POST /api/payment
// this will handle payments
// Private

router.post(
	"/",
	auth,

	async (req, res) => {
		const { token } = req.body;

		if (!token) {
			return res
				.status(400)
				.json({ error: "Token and product information are required" });
		}

		if (!req.user || !req.user.id) {
			return res.status(400).json({ error: "User information is required" });
		}

		try {
			const paymentIntent = await stripe.paymentIntents.create({
				amount: 100,
				currency: "usd",
				description: "Account Fee",
				payment_method_data: {
					type: "card",
					card: {
						token: token.id,
					},
				},
				confirm: true,
				description: `Charge for Linker Registration for ${req.user.id}`,
			});

			if (paymentIntent.status === "succeeded") {
				const paymentObj = new Payment({
					userId: req.user.id,
					price: 1.0,
					status: true,
					chargeId: paymentIntent.id,
				});
				const newPayment = await paymentObj.save();

				// Update User model to set paid to true
				await User.findByIdAndUpdate(req.user.id, { paid: true });

				return res.json({ success: true, payment: newPayment });
			} else {
				return res.status(400).json({ error: "Payment failed" });
			}
		} catch (error) {
			console.error(error.message);
			return res.status(500).json({ error: "Server Error" });
		}
	}
);

module.exports = router;

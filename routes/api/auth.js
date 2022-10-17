/** @format */

const express = require("express");
const router = express.Router();
const auth = require("../../config/middleware/auth");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

/**
 * route    GET api/auth
 * desc     Test route
 * access   Public
 *
 */

// be able to login user - 30m

router.post(
	"/",
	[
		auth,
		check("email", "Please enter your email address.").notEmpty(),
		check("password", "Password is required").notEmpty(),
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		/**
		 * see if user exists
		 */

		try {
			const { email, password } = req.body;

			let user = await User.find({ email });

			if (!user) {
				res.status(400).json({
					errors: [
						{
							msg: "The username or password is incorrect. Please enter the correct credentials.",
						},
					],
				});
				return;
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				res.status(400).json({
					errors: [
						{
							msg: "The username or password is incorrect. Please enter the correct credentials.",
						},
					],
				});
			}

			// return jsonwebtoken

			const payload = {
				user: {
					id: user.id,
					email: user.email,
				},
			};
			// ^^^^^^^^^^ that id is the ID of the recently saved user

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
					console.log(token);
				}
			);

			// protected routes middleware 30 mins
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);
module.exports = router;

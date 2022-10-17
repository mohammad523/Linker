/** @format */

const express = require("express");
const router = express.Router();
// const normalizeUrl = require("normalize-url");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * import User model
 */
const User = require("../../models/User.js");

/**
 * route    post api/users
 * desc     Register route
 * access   Public
 */
router.post(
	"/",
	[
		check("firstName", "Please enter your first name.").notEmpty(),
		check("lastName", "Please enter your last name.").notEmpty(),
		check("email", "Please enter a valid email address.").notEmpty().isEmail(),
		check("phoneNumber", "Please enter a valid phone number.")
			.notEmpty()
			.isMobilePhone(),
		check("password", "Please enter a password that has 6 characters or more.")
			.notEmpty()
			.isLength({ min: 6 }),
		check("paid", "Please pay $1.00 to complete registration.").equals(true),
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
			const {
				firstName,
				lastName,
				phoneNumber,
				email,
				password,
				linkedIn,
				location,
				bio,
				jobSeeking,
				hiring,
				justNetworking,
				meetMe,
				paid,
			} = req.body;

			let user = await User.findOne({ email });

			if (user) {
				res.status(400).json({ errors: [{ msg: "User already exists." }] });
				return;
			}

			// Gravatar
			const avatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm",
			});

			user = new User({
				firstName,
				lastName,
				phoneNumber,
				email,
				password,
				linkedIn,
				location,
				avatar,
				bio,
				jobSeeking,
				hiring,
				justNetworking,
				meetMe,
				paid,
			});

			// encrypt password

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

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

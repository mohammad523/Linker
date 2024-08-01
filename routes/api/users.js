/** @format */

const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const normalize = require("normalize-url");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const passport = require("passport");
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
		check("paid", "Please pay $1.00 to complete registration.").notEmpty(),
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

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
			/**
			 * see if user exists
			 */

			if (paid === false || paid === "false" || paid === "0" || paid === 0) {
				res.status(400).json({
					errors: [{ msg: "Please pay $1.00 to complete registration." }],
				});
				return;
			}

			let user = await User.findOne({ email });

			if (user) {
				res.status(400).json({ errors: [{ msg: "User already exists." }] });
				return;
			}

			// Gravatar
			const avatar = normalize(
				gravatar.url(email, {
					s: "200",
					r: "pg",
					d: "mm",
				}),
				{ forceHttps: true }
			);

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

// Route for initiating the Google OAuth authentication
router.post(
	"/google",
	passport.authenticate("google", { scope: ["email", "profile"] })
);

// Route for handling the Google OAuth callback
router.post(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/login" }),
	async (req, res) => {
		try {
			// Assuming you store the entire profile in the user object
			const googleUser = req.user;

			// Check if the user already exists in your database
			let user = await User.findOne({ email: googleUser.email });

			if (user) {
				res.status(400).json({ errors: [{ msg: "User already exists." }] });
				return;
			}

			// If the user doesn't exist, create a new user record
			if (!user) {
				user = new User({
					firstName: googleUser.firstName,
					lastName: googleUser.lastName,
					phoneNumber: "", // You may adjust this based on your schema
					email: googleUser.email,
					password: "", // No need for a password since it's a Google sign-up
					// Add other properties as needed
					// ...
				});

				console.log(req.user);
				console.log(res);

				// Gravatar
				const avatar = normalize(
					gravatar.url(googleUser.email, {
						s: "200",
						r: "pg",
						d: "mm",
					}),
					{ forceHttps: true }
				);

				user.avatar = avatar;

				// Save the new user to the database
				await user.save();
			}

			// Create a JWT token for the user
			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{ expiresIn: 360000 },
				(err, token) => {
					if (err) {
						console.error(err.message);
						res.status(500).send("Server error");
					} else {
						// Respond with the generated token
						res.json({ token });
					}
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;

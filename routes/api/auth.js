/** @format */

const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const auth = require("../../config/middleware/auth");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const FRONT_END = "http://localhost:3000";

/**
 * route    GET api/auth
 * access   Public
 *
 *
 * this route is protected by auth middleware.
 * It finds the user in the db by ID and loads the user information as json
 */

router.get("/", auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// ***NOT USING PASSPORT
// @access   Public
router.post(
	"/",
	check("email", "Please include a valid email").isEmail(),
	check("password", "Password is required").exists(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid Credentials" }] });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res
					.status(400)
					.json({ errors: [{ msg: "Invalid Credentials" }] });
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get("jwtSecret"),
				{ expiresIn: "5 days" },
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server error");
		}
	}
);

// Passport LocalStrategy setup

/**
 * route
 *
 */
passport.use(
	new LocalStrategy(
		{ usernameField: "email" },
		[
			check("email", "Please enter your email address.").isEmail(),
			check("password", "Password is required").exists(),
		],

		async (email, password, done) => {
			try {
				// Check if the user exists in the database
				const user = await User.findOne({ email });

				if (!user) {
					return done(null, false, { message: "Invalid Credentials" });
				}

				// Compare the provided password with the stored password hash
				const isMatch = await bcrypt.compare(password, user.password);

				if (!isMatch) {
					return done(null, false, { message: "Invalid Credentials" });
				}

				// If credentials are valid, return the user object
				return done(null, user);
			} catch (err) {
				return done(err);
			}
		}
	)
);

// Route for handling user login
// router.post(
// 	"/",
// 	passport.authenticate("local", { session: false }), // Use the local strategy
// 	(req, res) => {
// 		// If authentication is successful, create a JWT token
// 		const payload = {
// 			user: {
// 				id: req.user.id,
// 			},
// 		};

// 		jwt.sign(
// 			payload,
// 			config.get("jwtSecret"),
// 			{ expiresIn: "5 days" },
// 			(err, token) => {
// 				if (err) {
// 					console.error(err.message);
// 					res.status(500).send("Server error");
// 				} else {
// 					// Respond with the generated token
// 					res.json({ token });
// 				}
// 			}
// 		);
// 	}
// );

/**
 * route			POST /api/auth/google
 * authenticate		handle user login with google
 */

// @desc	google login success (check when user logged in or not from front-end?)
// @route	GET api/auth/login/success

// router.get("/login/success", (req, res) => {
// 	if (req.user) {
// 		res.status(200).json({
// 			error: false,
// 			message: "Successfully Loged In",
// 			user: req.user,
// 		});
// 	} else {
// 		res.status(403).json({ error: true, message: "Not Authorized" });
// 	}
// });

// @desc	google login
// @route	GET /api/auth/login
router.get("/login", (req, res) => {
	res.json({ user: req.user });
	console.log({ user: req.user });
});

// @desc		initiate the Google OAuth authentication
// @route	GET api/auth/google
router.get("/google", passport.authenticate("google", ["profile", "email"]));

// @desc	google auth callback
// @route	GET api/auth/google/callback

router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/" }),
	(req, res) => {
		res.redirect(`${FRONT_END}/dashboard`);
	}
);

// @desc    Logout user
// @route   api/auth/logout

router.get("/logout", (req, res) => {
	req.logout((err) => {
		if (err) {
			return res.status(500).json({ message: "Failed to log out" });
		}
		res.redirect("/");
	});
});

router.get("/check", (req, res) => {
	if (req.isAuthenticated()) {
		res.json({ isAuthenticated: true, user: req.user });
	} else {
		res.json({ isAuthenticated: false });
	}
});
module.exports = router;

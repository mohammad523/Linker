/** @format */

const express = require("express");
const router = express.Router();
const normalize = require("normalize");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

/**
 * import User model
 */
const User = require("../../models/User.js");

/**
 * route    post api/users
 * desc     Register route
 * access   Public
 */
router.post("/", async (req, res) => {
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
		} = req.body;

		let user = await User.findOne({ email });

		if (user) {
			res.status(400).json({ errors: [{ msg: "User already exists" }] });
		}

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
		});

		// encrypt password

		const salt = await bcrypt.genSalt(10);

		user.password == (await bcrypt.hash(password, salt));

		await user.save();

		res.send("User Registered");
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});
module.exports = router;

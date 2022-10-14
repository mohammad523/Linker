/** @format */

const express = require("express");
const router = express.Router();
const auth = require("../../config/middleware/auth");
const User = require("../../models/User");

/**
 * route    GET api/auth
 * desc     Test route
 * access   Public
 */

router.get("/", auth, async (req, res) => {
	try {
		/**
		 * we are accessing req.user.id from "auth" middleware
		 *
		 * .select('-password'), we dont want to return the password
		 */

		const user = await User.findById(req.user.id).select("-password");

		res.json(user);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;

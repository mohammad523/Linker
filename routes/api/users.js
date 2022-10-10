/** @format */

const express = require("express");
const router = express.Router();

/**
 * route    post api/users
 * desc     Register route
 * access   Public
 */
router.post("/", (req, res) => {
	console.log(req.body);
	res.send("User Route");
});
module.exports = router;

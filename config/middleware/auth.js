/** @format */

const jwt = require("jsonwebtoken");
const config = require("config");

/**
 * middleware is the middleman between the server and the client.
 * it process the jwt token from the req.header, then verify, then decrypt
 */

module.exports = function (req, res, next) {
	// get token from header
	const token = req.header("x-auth-token");

	console.log("token", token);
	console.log("request object", req);

	// check if no token
	if (!token) {
		return res.status(401).json({ msg: "No token, authorization denied." });
	}

	// Verify token

	try {
		// decrypt token
		const decoded = jwt.verify(token, config.get("jwtSecret"));

		console.log("decoded", decoded);

		// this will connect the payload
		req.user = decoded;

		next();
	} catch (error) {
		// if token is not valid, this will run

		console.log("res object", res);
		res.status(401).json({ msg: "Token is not valid" });
	}
};

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

	// check if no token
	if (!token) {
		return res.status(401).json({ msg: "No token, authorization denied." });
	}

	// Verify token

	try {
		// decrypt token
		jwt.verify(token, config.get("jwtSecret"), (error, decoded) => {
			if (error) {
				return res.status(401).json({ msg: "Token is not valid" });
			} else {
				// this will connect the payload

				req.user = decoded.user;

				next();
			}
		});
	} catch (error) {
		// if token is not valid, this will run

		res.status(401).json({ msg: "Token is not valid" });
	}
};

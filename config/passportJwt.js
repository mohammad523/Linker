/** @format */

passport = require("passport");
const User = require("../models/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

require("dotenv").config();

// setup options for JWT Strategy
const jwtOptions = {};

// create JWT strategy

const jwtLogin = new JwtStrategy(jwtOptions, async function (payload, done) {
	await User.findById(payload.sub, function (err, user) {
		if (err) {
			return done(err, false);
		}

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

/**
 * how to setup google auth?
 *
 * go to google developers
 *
 * create a project
 *
 * @format
 */

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
const mongoose = require("mongoose");

module.exports = function (passport) {
	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: `${process.env.BACKEND_URL}api/auth/google/callback`,
				scope: ["profile"],
			},
			async (aT, rT, profile, done) => {
				const newUser = {
					firstName: profile._json.given_name,
					lastName: profile._json.family_name,
					email: profile._json.email,
					googleId: profile._json.sub,
					avatar: profile._json.picture,
				};
				try {
					let user = await User.findOne({ googleId: profile.id });

					if (user) {
						done(null, user);
					} else {
						user = await User.create(newUser);
						done(null, user);
					}
				} catch (err) {
					console.error(err);
				}
			}
		)
	);
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		console.log(id);
		User.findById(id, (err, user) => done(err, user));
	});
};

/** @format */

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
	},
	phoneNumber: {
		type: String,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	googleId: {
		type: String,
		unique: true,
	},
	facebookId: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},

	linkedIn: {
		type: String,
	},
	location: {
		type: String,
	},
	avatar: {
		type: String,
	},
	bio: {
		type: String,
	},
	jobSeeking: {
		type: Boolean,
	},
	hiring: {
		type: Boolean,
	},
	justNetworking: {
		type: Boolean,
	},
	meetMe: {
		type: Boolean,
	},
	paid: {
		type: Boolean,
		default: false,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model("user", UserSchema);

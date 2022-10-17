/** @format */

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	phoneNumber: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},

	linkedIn: {
		type: String,
	},
	location: {
		type: String,
	},
	avatar: {
		type: String,
		required: true,
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
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model("user", UserSchema);

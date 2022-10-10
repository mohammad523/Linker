/** @format */

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		first: String,
		last: String,
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
		city: String,
		state: String,
	},
	avatar: {
		type: String,
		required: true,
	},
	description: {
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
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = User = mongoose.model("user", UserSchema);

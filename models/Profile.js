/** @format */

const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	headline: {
		type: String,
	},
	website: {
		type: String,
	},
	company: {
		type: String,
	},
	status: {
		type: String,
	},
	skills: {
		type: [String],
		required: true,
	},
	githubusername: {
		type: String,
	},
	experience: [
		{
			title: {
				type: String,
			},
			company: {
				type: String,
			},
			location: {
				type: String,
			},
			from: {
				type: String,
			},
			to: {
				type: String,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
			},
		},
	],
	education: [
		{
			school: {
				type: String,
			},
			degree: {
				type: String,
			},
			fieldofstudy: {
				type: String,
			},
			from: {
				type: Date,
			},
			to: {
				type: String,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
			},
		},
	],
	social: {
		youtube: {
			type: String,
		},
		twitter: {
			type: String,
		},
		facebook: {
			type: String,
		},
		linkedin: {
			type: String,
		},
		instagram: {
			type: String,
		},
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);

/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "user",
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	userAvatar: {
		type: String,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	link: {
		type: String,
		required: true,
	},
	eventDate: {
		type: Date,
		required: true,
	},
	attendees: [
		{
			type: Schema.Types.ObjectId,
			ref: "user",
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("event", EventSchema);

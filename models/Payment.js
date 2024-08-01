/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	status: {
		type: Boolean,
		required: true,
	},
	chargeId: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Payment", PaymentSchema);

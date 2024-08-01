/** @format */

// this file connects mongoose to mongodb atlas

const mongoose = require("mongoose");
const keys = require("./default.json");

const db = keys.MONGO_URI;
const dbLocal = keys.MONGO_LOCAL;

const connectDB = async () => {
	try {
		await mongoose.connect(dbLocal);

		console.log("MongoDB Connected...");
	} catch (err) {
		console.error(err.message);
		// exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;

/** @format */

const express = require("express");
const http = require("http");
const morgan = require("morgan");
const connectDB = require("./config/db");
const cors = require("cors");
const passport = require("passport");
const passportStrategy = require("./config/passport");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieSession = require("cookie-session");
const authRoute = require("./routes/api/auth");
const app = express();
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

// Load config
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport);

// connect database
connectDB();

// init middleware

app.use(
	cors({
		origin: "http://localhost:3000",
	})
);
app.use(express.json());
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
	})
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

/**
 * Define Routes
 *
 * WHAT IS 'app.use'?
 * The path is a "mount" or "prefix" path and limits the middleware
 * to only apply to any paths requested that begin with it
 *
 */
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/payment", require("./routes/api/payment"));
app.use("/api/events", require("./routes/api/events"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/users", require("./routes/api/users"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("Client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "Client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

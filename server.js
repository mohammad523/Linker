/** @format */

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();

// connect database
connectDB();

// init middleware

app.use(express.json({ extended: false }));
app.use(cors());

/**
 * Define Routes
 *
 * WHAT IS 'app.use'?
 * The path is a "mount" or "prefix" path and limits the middleware
 * to only apply to any paths requested that begin with it
 *
 */
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/events", require("./routes/api/events"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/payment", require("./routes/api/payment"));

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

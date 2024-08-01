/** @format */

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../config/middleware/auth");
const normalize = require("normalize-url");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Event = require("../../models/Event");
const checkObjectId = require("../../config/middleware/checkObjectId");

/**
 * route    POST api/event
 * desc     Create or Update event
 * access   Private
 */
router.post(
	"/",
	auth,
	check("title", "Title is required").notEmpty(),
	check("description", "Description is required").notEmpty(),
	check("eventDate", "Date is required").notEmpty(),

	async (req, res) => {
		// Check for errors in fields
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Link User to event and create User variable
		const user = await User.findById(req.user.id).select("-password");

		const { title, description, eventDate, link } = req.body;

		const normalizedLink =
			link && link.length > 0 ? normalize(link, { forceHttps: true }) : "";

		const newEventFields = {
			user: req.user.id,
			userName: `${user.firstName} ${user.lastName}`,
			userAvatar: user.avatar,
			title,
			description,
			link: normalizedLink,
			eventDate,
			attendees: [],
		};
		try {
			const event = await Event.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: newEventFields },
				{ new: true, upsert: true, setDefaultsOnInsert: true }
			);
			res.json(event);
		} catch (error) {
			console.error(error.message);
			return res.status(500).send("Server Error");
		}
	}
);

/**
 * route    GET api/event
 * desc     Get all events
 * access   Private
 */
router.get("/", auth, async (req, res) => {
	try {
		const events = await Event.find().populate("user", [
			"firstName",
			"lastName",
			"avatar",
		]);
		res.json(events);
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

/**
 * route    Delete api/events/:id
 * desc     Delete an events
 * access   Private
 */

router.delete("/:id", auth, checkObjectId("id"), async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);

		const { title } = event;

		if (!event) {
			return res.status(404).json({ msg: "Event not found" });
		}

		// Check User
		if (event.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: "User not authorized" });
		}

		await event.remove();

		res.json(`You have successfully deleted the ${title} Event`);
	} catch (error) {
		console.error(error.message);

		res.status(500).send("Server Error");
	}
});

/**
 * route    Put api/events/attend/:id
 * desc     Attend an event
 * access   Private
 */
/**
 * route    Put api/events/unattend/:id
 * desc     Remove Attendance of an event
 * access   Private
 */

module.exports = router;

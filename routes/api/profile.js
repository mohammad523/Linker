/** @format */

const express = require("express");
const router = express.Router();
const axios = require("axios");
const auth = require("../../config/middleware/auth");
const { check, validationResult } = require("express-validator");

const normalize = require("normalize-url");
const checkObjectId = require("../../config/middleware/checkObjectId");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

/**
 * route    GET api/profile/me
 * desc     Test route
 * access   Public
 */

router.get("/me", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.user.id,
		}).populate("user", ["name", "avatar"]);

		if (!profile) {
			return res.status(400).json({ msg: "There is no profile for this user" });
		}

		res.json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});
/**
 * route    POST api/profile
 * desc     Create or update user profile
 * access   Private
 */
router.post(
	"/",
	auth,

	check("status", "Status is required").notEmpty(),
	check("skills", "Skills are required").notEmpty(),

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			website,
			company,
			skills,
			githubusername,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin,
			...rest
		} = req.body;

		// Build profile object
		const profileFields = {
			user: req.user.id,
			website:
				website && website !== ""
					? normalize(website, { forceHttps: true })
					: "",
			skills: Array.isArray(skills)
				? skills
				: skills.split(",").map((skill) => " " + skill.trim()),
			...rest,
		};

		//Build social media object
		// Build socialFields object
		const socialFields = { youtube, twitter, instagram, linkedin, facebook };

		// normalize social fields to ensure valid url
		for (const [key, value] of Object.entries(socialFields)) {
			if (value && value.length > 0)
				socialFields[key] = normalize(value, { forceHttps: true });
		}
		// add to profileFields
		profileFields.social = socialFields;

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if (profile) {
				//update
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true, upsert: true, setDefaultsOnInsert: true }
				);
				return res.json(profile);
			}

			//Create
			profile = new Profile(profileFields);

			await profile.save();
			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

/**
 * route    POST api/profile
 * desc     Show all users and avatars
 * access   Public
 */

router.get("/", async (req, res) => {
	try {
		const profiles = await Profile.find().populate("user", [
			"firstName",
			"lastName",
			"avatar",
		]);
		res.json(profiles);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send("Server Error");
	}
});

/**
 * route    GET api/profile/user/:user_id
 * desc     Get profile by user ID
 * access   Public
 */

router.get(
	"/user/:user_id",
	checkObjectId("user_id"),
	async ({ params: { user_id } }, res) => {
		try {
			const profile = await Profile.findOne({
				user: user_id,
			}).populate("user", ["name", "avatar"]);

			if (!profile) return res.status(400).json({ msg: "Profile not found" });

			return res.json(profile);
		} catch (err) {
			console.error(err.message);
			return res.status(500).json({ msg: "Server error" });
		}
	}
);
//@route   DELETE api/profile
//@desc    DELETE profile, user & posts
//@access  Private
router.delete("/", auth, async (req, res) => {
	try {
		// remover user's posts
		await Posts.deleteMany({ user: req.user.id });

		// Remove profile,
		await Profile.findOneAndRemove({ user: req.user.id });
		// Remove user
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: "User deleted" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

//@route   PUT api/profile
//@desc    Add profile experience
//@access  Private
router.put(
	"/experience",
	auth,

	check("title", "Title is required").not().isEmpty(),
	check("company", "Company is required").not().isEmpty(),
	check("from", "From is required").not().isEmpty(),

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, company, location, from, to, current, description } =
			req.body;
		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.experience.unshift(newExp);

			await profile.save();

			res.json(profile);
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Server Error");
		}
	}
);

//@route   DELETE api/profile/experience/:exp_id
//@desc    Delete profile experience from profile
//@access  Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		// Get remove index
		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id);

		profile.experience.splice(removeIndex, 1);

		await profile.save();

		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

//@route   PUT api/profile/education
//@desc    Add profile education
//@access  Private
router.put(
	"/education",
	auth,
	check("school", "School is required").notEmpty(),
	check("degree", "Degree is required").notEmpty(),
	check("fieldofstudy", "Field of study is required").notEmpty(),
	check("from", "From date is required and needs to be from the past")
		.notEmpty()
		.custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			profile.education.unshift(req.body);

			await profile.save();

			res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
); //@route   DELETE api/profile/education/:edu_id
//@desc    Delete profile education from profile
//@access  Private
router.delete("/education/:edu_id", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		// Get remove index
		const removeIndex = profile.education
			.map((item) => item.id)
			.indexOf(req.params.edu_id);

		profile.education.splice(removeIndex, 1);

		await profile.save();

		res.json(profile);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});
// @route    GET api/profile/github/:username
// @desc     Get user repos from Github
// @access   Public
router.get("/github/:username", async (req, res) => {
	try {
		const uri = encodeURI(
			`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
		);
		const headers = {
			"user-agent": "node.js",
			Authorization: `token ${config.get("githubToken")}`,
		};

		const gitHubResponse = await axios.get(uri, { headers });
		return res.json(gitHubResponse.data);
	} catch (err) {
		console.error(err.message);
		return res.status(404).json({ msg: "No Github profile found" });
	}
});

module.exports = router;

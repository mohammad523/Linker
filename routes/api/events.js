/** @format */

const express = require("express");
const router = express.Router();

/**
 * route    GET api/Event
 * desc     Test route
 * access   Public
 */
router.get("/", (req, res) => res.send("Events Route"));

module.exports = router;

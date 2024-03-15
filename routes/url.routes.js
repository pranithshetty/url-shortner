const express = require("express");
const {
	handleGenerateShortURL,
	handleGetAnalytics,
} = require("../controllers/url.controller");
const router = express.Router();

router.post("/", handleGenerateShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;

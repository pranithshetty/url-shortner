const express = require("express");
const { URL } = require("../model/url.model");
const router = express.Router();

router.get("/", async (req, res) => {
	const allUrls = await URL.find({});
	return res.render("home", { urls: allUrls });
});

router.get("/signup", async (req, res) => {
	return res.render("signUp");
});

router.get("/login", async (req, res) => {
	return res.render("login");
});

module.exports = router;

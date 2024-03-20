const express = require("express");
const { URL } = require("../model/url.model");
const router = express.Router();

router.get("/", async (req, res) => {
	if (!req.user) return res.redirect("/login");
	//console.log("user", req.user._id);
	const allUrls = await URL.find({ createdBy: req.user._id });
	return res.render("home", { urls: allUrls });
});

router.get("/signup", async (req, res) => {
	return res.render("signUp");
});

router.get("/login", async (req, res) => {
	return res.render("login");
});

module.exports = router;

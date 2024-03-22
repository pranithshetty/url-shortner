const express = require("express");
const { URL } = require("../model/url.model");
const { restrictTo } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
	// if (!req.user) return res.redirect("/login");
	const allUrls = await URL.find({ createdBy: req.user._id });
	return res.render("home", { urls: allUrls });
});

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
	// if (!req.user) return res.redirect("/login");
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

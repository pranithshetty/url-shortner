const { nanoid } = require("nanoid");
const { URL } = require("../model/url.model");

async function handleGenerateShortURL(req, res) {
	//logic
	const shortId = nanoid(8);
	const body = req.body;
	console.log(body);
	if (!body.url) return res.status(400).json({ error: "URL is required" });

	await URL.create({
		shortId: shortId,
		redirectUrl: body.url,
		visitHistory: [],
	});
	return res.json({ status: "Success", shortId: shortId });
}

async function handleGetAnalytics(req, res) {
	if (!req.params.shortId)
		return res.status(400).json({ error: "ShortId is required" });
	const shortId = req.params.shortId;
	console.log(shortId);
	const result = await URL.findOne({ shortId });
	return res.json({
		totalClicks: result.visitHistory.length,
		analytics: result.visitHistory,
	});
}

module.exports = { handleGenerateShortURL, handleGetAnalytics };

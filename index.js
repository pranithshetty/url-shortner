//URL Shortner entry
const express = require("express");
const urlRouter = require("./routes/url.routes");
const connectMongoDb = require("./connection");
const { URL } = require("./model/url.model");

const app = express();
const PORT = 3000;
connectMongoDb("mongodb://127.0.0.1:27017/short-url");

app.use(express.json());

app.use("/url", urlRouter);

app.get("/:shortId", async (req, res) => {
	const shortId = req.params.shortId;
	const entry = await URL.findOneAndUpdate(
		{ shortId },
		{
			$push: {
				visitHistory: { timestamp: Date.now() },
			},
		}
	);
	res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
	console.log(`Server is running on PORT::${PORT}`);
});

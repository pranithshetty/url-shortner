//URL Shortner entry
const express = require("express");
const urlRouter = require("./routes/url.routes");
const staticRouter = require("./routes/staticPage.routes");
const userRouter = require("./routes/user.routes");
const connectMongoDb = require("./connection");
const { URL } = require("./model/url.model");
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictToLoginUserOnly } = require("./middlewares/auth.middleware");

const app = express();
const PORT = 3000;
connectMongoDb("mongodb://127.0.0.1:27017/short-url");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRouter);
app.use("/", staticRouter);
app.use("/user", userRouter);

app.get("/url/:shortId", async (req, res) => {
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

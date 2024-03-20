const { User } = require("../model/user.model");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");
async function handleUserSignUp(req, res) {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password)
			return res.status(400).json({ error: "Missing required fields" });
		await User.create({
			name,
			email,
			password,
		});

		return res.render("home");
	} catch (error) {
		return res.render("signUp", { error: "Duplicate entry email" });
	}
}

async function handleUserLogin(req, res) {
	const { email, password } = req.body;

	const user = await User.findOne({ email, password });
	if (!user) {
		return res.render("login", {
			error: "invalid username or password",
		});
	}
	/*
	* Used for Stateless auth
	const sessionId = uuidv4();
	setUser(sessionId, user);
	res.cookie("uid", sessionId);*/

	const token = setUser(user);
	res.cookie("uid", token);

	return res.redirect("/");
}

module.exports = { handleUserSignUp, handleUserLogin };

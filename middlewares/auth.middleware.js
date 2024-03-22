const { getUser } = require("../services/auth");

//authentication
function checkForAuthentication(req, res, next) {
	const tokenCookie = req.cookies?.token;
	req.user = null;
	if (!tokenCookie) return next();

	const token = tokenCookie;
	const user = getUser(token);
	req.user = user;
	return next();
}

//authorization
function restrictTo(roles = []) {
	return function (req, res, next) {
		if (!req.user) {
			return res.redirect("/login");
		}
		if (!roles.includes(req.user.role)) {
			return res.end("Un-Authorized");
		}
		return next();
	};
}

/* 
* For authentication via cookies
! cookies can cause issue when deploying on multiple devices 
*/
/*
async function restrictToLoginUserOnly(req, res, next) {
	const uuid = req.cookies?.uid;
	if (!uuid) {
		return res.redirect("/login");
	}
	const user = getUser(uuid);
	if (!user) return res.redirect("/login");
	req.user = user;
	next();
}

async function checkAuth(req, res, next) {
	const uuid = req.cookies?.uid;
	const user = getUser(uuid);
	req.user = user;
	next();
}

*/

module.exports = { checkForAuthentication, restrictTo };

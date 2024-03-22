const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
/*
*Used when writing stateFull authentication
const sessionIdToUserMap = new Map();
*/

function setUser(user) {
	/* 
	* USed in statefull auth
	sessionIdToUserMap.set(id, user);

	*/
	return jwt.sign(
		{ _id: user?._id, email: user?.email, role: user?.role },
		secret
	);
}

function getUser(token) {
	/*
	* USed in statefull auth
	return sessionIdToUserMap.get(id);
	*/
	if (!token) return null;

	try {
		return jwt.verify(token, secret);
	} catch (error) {
		return null;
	}
}

module.exports = { setUser, getUser };

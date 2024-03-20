const mongoose = require("mongoose");

async function connectMongoDb(url) {
	return mongoose
		.connect(url)
		.then((res) => console.log("Mongo connected", res.connection.host))
		.catch((err) => {
			console.log("Mongo connection err::", err);
		});
}

module.exports = connectMongoDb;

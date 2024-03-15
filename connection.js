const mongoose = require("mongoose");

async function connectMongoDb(url) {
	return mongoose
		.connect(url)
		.then(console.log("Mongo connected"))
		.catch((err) => {
			console.log("Mongo connection err::", err);
		});
}

module.exports = connectMongoDb;

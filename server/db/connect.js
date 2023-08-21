const mongoose = require("mongoose");

let connection = null;

async function connectToDatabase(connectionString) {
	try {
		if (!connection) {
			connection = await mongoose.connect(connectionString);
			console.log("You successfully connected to MongoDB..!");
		} else {
			console.log("Exist connected to MongoDB..!");
			return connection;
		}
	} catch (error) {
		console.error("Error when connecting to MongoDB: ", error);
	}
}

module.exports = connectToDatabase;

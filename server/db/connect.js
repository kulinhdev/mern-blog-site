// Import required libraries
const mongoose = require("mongoose");

// Connect to MongoDB
async function connectToDatabase(connectionString) {
	console.log("connectionString:", connectionString);
	try {
		await mongoose.connect(connectionString);
		console.log("Success connected to MongoDB ..!");
		return mongoose.connection;
	} catch (error) {
		console.error("Error connecting to MongoDB: ", error);
	}
}

module.exports = connectToDatabase;

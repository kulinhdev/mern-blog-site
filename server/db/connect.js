// Import required libraries
const mongoose = require("mongoose");

// Connect to MongoDB
async function connectToDatabase(connectionString) {
	try {
		await mongoose.connect(connectionString);
		console.log("You successfully connected to MongoDB..!");
		return mongoose.connection;
	} catch (error) {
		console.error("Error when connecting to MongoDB: ", error);
	}
}

module.exports = connectToDatabase;

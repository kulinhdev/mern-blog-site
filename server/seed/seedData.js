const configs = require("../config/keys");
const connectToDatabase = require("../db/connect");

// Connect to database
const connection = connectToDatabase(configs.mongoDbConnectionString);

// Seed Model
const seedCategories = require("./seedCategories");
const seedPosts = require("./seedPost");
const seedUsers = require("./seedUsers");

async function seedAllData() {
	// await seedUsers(10);
	// await seedCategories(10);
	await seedPosts(10);
}

seedAllData()
	.then(() => {
		console.log("Data seeding complete");
		process.exit(0);
	})
	.catch((error) => {
		console.error("Error seeding data:", error);
		process.exit(1);
	}).finally(() => {
        connection.disconnect();
    });

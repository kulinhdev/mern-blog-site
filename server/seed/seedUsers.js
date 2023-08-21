const faker = require("faker");
const User = require("../models/User");

const configs = require("../config/keys");
const connectToDatabase = require("../db/connect");

// Connect to database
const connection = connectToDatabase(configs.mongoDbConnectionString);

// Function to generate fake user data
const generateFakeUser = () => {
	return {
		userName: faker.internet.userName(),
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		email: faker.internet.email(),
		password: faker.internet.password(),
		role: faker.random.arrayElement(["user", "admin"]),
		avatar: faker.image.avatar(),
		token: faker.datatype.uuid(),
		isVerified: faker.datatype.boolean(),
		savedPosts: [], // You can add logic to associate saved posts here
		likedPosts: [], // You can add logic to associate liked posts here
	};
};

// Function to seed fake user data
const seedUsers = async (count) => {
	try {
		for (let i = 0; i < count; i++) {
			const fakeUser = generateFakeUser();
			await User.create(fakeUser);
			console.log(`User ${i + 1} created`);
		}
		console.log("User seeding complete");
	} catch (error) {
		console.error("Error seeding users:", error);
	}
};

module.exports = seedUsers;

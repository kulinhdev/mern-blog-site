const faker = require("faker");
const Category = require("../models/Category");

// Function to generate fake data
const generateFakeCategory = () => {
	const uniqueImageIdentifier = faker.random.alphaNumeric(10);
	return {
		title: faker.commerce.department(),
		slug: faker.lorem.slug(),
		image: `http://placeimg.com/640/480/${uniqueImageIdentifier}`,
		content: faker.lorem.paragraphs(),
	};
};

// Function to seed fake data
const seedFakeData = async (count) => {
	try {
		// Clear existing categories before seeding
		await Category.deleteMany();

		for (let i = 0; i < count; i++) {
			const fakeCategory = generateFakeCategory();
			await Category.create(fakeCategory);
			console.log(`Category ${i + 1} created`);
		}
		console.log("Fake data seeding complete");
	} catch (error) {
		console.error("Error seeding fake data:", error);
	}
};

module.exports = seedFakeData;

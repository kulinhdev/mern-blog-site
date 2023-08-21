const faker = require("faker");
const Category = require("../models/Category");
const Post = require("../models/Post");
const User = require("../models/User");

// Function to generate fake data for posts
const generateFakePost = async () => {
	try {
		const categories = await Category.find();

		const randomCategoryIndex = faker.datatype.number({
			min: 0,
			max: categories.length - 1,
		});
		const category = categories[randomCategoryIndex];

		const randomUser = await User.aggregate([{ $sample: { size: 1 } }]);

		const title = faker.lorem.sentence();
		const slug = faker.helpers.slugify(title);

		return {
			title: title,
			slug: slug,
			readingMinutes: faker.datatype.number({ min: 1, max: 10 }),
			likes: faker.datatype.number({ min: 0, max: 100 }),
			image: faker.image.imageUrl() + Date.now(),
			content: faker.lorem.paragraphs(),
			author: randomUser[0]._id,
			categories: [category._id],
		};
	} catch (error) {
		throw error;
	}
};

// Function to seed fake data for posts
const seedPosts = async (count) => {
	try {
		// Clear existing categories before seeding
		await Post.deleteMany();

		for (let i = 0; i < count; i++) {
			const fakePost = await generateFakePost();
			await Post.create(fakePost);
			console.log(`Post ${i + 1} created`);
		}
		console.log("Post seeding complete");
	} catch (error) {
		console.error("Error seeding posts:", error);
	}
};

module.exports = seedPosts;

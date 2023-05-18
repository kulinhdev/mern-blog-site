const Post = require("../models/Post");

async function getAllPosts(req, res) {
	const page = req.query.page || 1;
	const limit = 10;
	const skip = (page - 1) * limit;
	const searchTerm = req.query.title || "";

	try {
		const count = await Post.countDocuments({
			title: { $regex: searchTerm, $options: "i" },
		});
		const posts = await Post.find({
			title: { $regex: searchTerm, $options: "i" },
		})
			.sort("-createdAt")
			.skip(skip)
			.limit(limit);

		// Map the posts and add the image URLs
		const postsWithImages = posts.map((post) => ({
			_id: post._id,
			title: post.title,
			content: post.content,
			slug: post.slug,
			tags: post.tags,
			createdAt: post.createdAt,
			imageUrl: `${req.protocol}://${req.get("host")}/${post.image}`,
		}));

		res.status(200).json({ count, posts: postsWithImages });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function getPostBySlug(req, res) {
	try {
		const post = await Post.findOne({ slug: req.params.slug });
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		// Map the posts and add the image URLs
		const postWithImage = {
			_id: post._id,
			title: post.title,
			content: post.content,
			slug: post.slug,
			tags: post.tags,
			createdAt: post.createdAt,
			imageUrl: `${req.protocol}://${req.get("host")}/${post.image}`,
		};

		res.json(postWithImage);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

module.exports = {
	getAllPosts,
	getPostBySlug,
};

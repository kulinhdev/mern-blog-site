const slugify = require("slugify");
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
			imageUrl: `${req.protocol}://${req.get("host")}/${post.image}`,
		}));

		res.status(200).json({ count, posts: postsWithImages });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function getPostById(req, res) {
	try {
		const post = await Post.findById(req.params.id);
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
			imageUrl: `${req.protocol}://${req.get("host")}/${post.image}`,
		};

		res.json(postWithImage);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function generateSlug(post) {
	let slug = slugify(post.title, {
		replacement: "-",
		trim: true,
		lower: true,
		strict: true,
	});
	post.slug = slug;
	let foundPost = await Post.findOne({ slug }).exec();
	if (foundPost) {
		// There is already a post with this slug, so we need to generate a new one
		let count = 1;
		let newSlug = slug;
		while (foundPost) {
			newSlug = `${slug}-${count}`;
			foundPost = await Post.findOne({ slug: newSlug }).exec();
			count++;
		}
		post.slug = newSlug;
	}
}

async function createPost(req, res) {
	const { title, content, author } = req.body;
	const imagePath = req.file ? req.file.path : null;

	console.log("imagePath", imagePath);

	try {
		const post = new Post({
			title,
			content,
			author,
			image: imagePath,
		});
		await generateSlug(post); // Generate a unique slug before saving
		const savedPost = await post.save();
		res.json({ post: savedPost, message: "Create new post successfully!" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function updatePost(req, res) {
	// try {
	// 	const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
	// 		new: true,
	// 	});
	// 	if (!post) {
	// 		return res.status(404).json({ message: "Post not found" });
	// 	}
	// 	res.json(post);
	// } catch (error) {
	// 	res.status(500).json({ error: error.message });
	// }

	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res
				.status(404)
				.json({ message: "Post not found with id: " + req.params.id });
		}

		const { title, content, tags } = req.body;

		// Check if the title change generate new slug
		if (title && title !== post.title) {
			post.title = title;
			await generateSlug(post); // Generate a unique slug before saving
		}

		// Update the post with the new data
		post.content = content || post.content;
		post.tags = tags;

		await post.save();

		res.json({
			post,
			message: `Update post ${req.params.id} successfully!`,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function deletePost(req, res) {
	try {
		const post = await Post.findByIdAndDelete(req.params.id);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		res.json({ message: "Post deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

module.exports = {
	getAllPosts,
	getPostById,
	createPost,
	updatePost,
	deletePost,
};

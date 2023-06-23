const Post = require("../../models/Post");

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
			readingMinutes: post.readingMinutes,
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
			readingMinutes: post.readingMinutes,
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

async function addLike(req, res) {
	try {
		const { postId, userId } = req.body;

		// Check if the user has already liked the post
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		const isLiked = post.likes.find(
			(like) => like.toString() === userId.toString()
		);
		if (isLiked) {
			return res
				.status(400)
				.json({ message: "You have already liked this post" });
		}

		// Add the like to the post
		post.likes.push(userId);
		await post.save();

		res.json({ message: "Post liked successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function addComment(req, res) {
	try {
		const { postId, userId, text } = req.body;

		// Check if the post exists
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		// Create a new comment object
		const newComment = {
			user: userId,
			text,
			createdAt: Date.now(),
		};

		// Add the comment to the post
		post.comments.push(newComment);
		await post.save();

		res.json({ message: "Comment added successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function savePost(req, res) {
	try {
		const { postId, userId, isSaved } = req.body;

		// Find the user by ID
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Toggle the isSaved property of the post in the user's savedPosts array
		const index = user.savedPosts.indexOf(postId);
		if (isSaved && index === -1) {
			user.savedPosts.push(postId);
		} else if (!isSaved && index !== -1) {
			user.savedPosts.splice(index, 1);
		}
		await user.save();

		res.json({
			isSaved,
			message: "Post saved status updated successfully",
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

module.exports = {
	getAllPosts,
	getPostBySlug,
	addLike,
	addComment,
	savePost,
};

const Comment = require("../../models/Comment");
const Post = require("../../models/Post");
const Reply = require("../../models/Reply");
const User = require("../../models/User");

async function getAllPosts(req, res) {
	const page = req.query.page || 1;
	const limit = req.query.limit || 10;
	const skip = (page - 1) * limit;
	const searchTerm = req.query.search || "";
	const sortValue = req.query.sort || "newest";
	const selectedCategoryIds = req.query.categories || "";

	console.log({ page, limit, skip, selectedCategoryIds });

	try {
		let sortOption = {};
		if (sortValue === "newest") {
			sortOption = { createdAt: -1 };
		} else if (sortValue === "oldest") {
			sortOption = { createdAt: 1 };
		} else if (sortValue === "a-z") {
			sortOption = { title: 1 };
		} else if (sortValue === "z-a") {
			sortOption = { title: -1 };
		}

		// Split the selectedCategoryIds string into an array of category IDs
		const categoryIdsArray = selectedCategoryIds.split(",").filter(Boolean);

		// Define the filter criteria based on search term and selected categories
		const filterCriteria = {
			title: { $regex: searchTerm, $options: "i" },
		};

		// If categoryIdsArray is not empty, add the categories filter to the criteria
		if (categoryIdsArray.length > 0) {
			filterCriteria.categories = { $in: categoryIdsArray };
		}

		// Get the count of posts based on the filter criteria
		const count = await Post.countDocuments(filterCriteria);

		const posts = await Post.find(filterCriteria)
			.sort(sortOption)
			.skip(skip)
			.limit(limit)
			.populate({
				path: "categories",
				options: { sort: { createdAt: -1 } },
			});

		// Map the posts and add the image URLs
		const postsWithImages = posts.map((post) => ({
			id: post._id,
			title: post.title,
			content: post.content,
			readingMinutes: post.readingMinutes,
			slug: post.slug,
			likes: post.likes,
			tags: post.tags,
			categories: post.categories,
			createdAt: post.createdAt,
			imageUrl: `${req.protocol}://${req.get("host")}/${post.image}`,
		}));

		res.status(200).json({ count, posts: postsWithImages });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function getPostById(req, res) {
	console.log(req.params.id);
	try {
		const post = await Post.findOne({ _id: req.params.id })
			.populate({
				path: "categories",
				options: { sort: { createdAt: -1 } },
			})
			.populate({
				path: "comments",
				populate: [
					{
						path: "user",
						model: "User",
						select: "firstName lastName userName email avatar",
					},
					{
						path: "replies",
						populate: {
							path: "user",
							model: "User",
							select: "firstName lastName userName email avatar",
						},
						options: { sort: { createdAt: 1 } },
					},
				],
				options: { sort: { createdAt: -1 } }, // sort: newest to oldest
			});

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		// Map the posts and add the image URLs
		const postWithImage = {
			id: post._id,
			title: post.title,
			content: post.content,
			readingMinutes: post.readingMinutes,
			slug: post.slug,
			likes: post.likes,
			tags: post.tags,
			comments: post.comments,
			categories: post.categories,
			createdAt: post.createdAt,
			imageUrl: `${req.protocol}://${req.get("host")}/${post.image}`,
		};

		res.json(postWithImage);
	} catch (error) {
		console.log({ error: error.message });
		res.status(500).json({ error: error.message });
	}
}

async function getPostBySlug(req, res) {
	try {
		const post = await Post.findOne({ slug: req.params.slug })
			.populate({
				path: "comments",
				populate: {
					path: "user",
					model: "User",
					select: "firstName lastName userName email avatar",
				},
				options: { sort: { createdAt: -1 } }, // sort: newest to oldest
			})
			.populate({
				path: "comments.replies",
				populate: {
					path: "user",
					model: "User",
					select: "firstName lastName userName email avatar",
				},
				options: { sort: { createdAt: -1 } },
				match: { "replies.createdAt": { $exists: true } },
				sort: { "replies.createdAt": -1 },
			});

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		// Map the posts and add the image URLs
		const postWithImage = {
			id: post._id,
			title: post.title,
			content: post.content,
			readingMinutes: post.readingMinutes,
			slug: post.slug,
			likes: post.likes,
			tags: post.tags,
			comments: post.comments,
			createdAt: post.createdAt,
			imageUrl: `${req.protocol}://${req.get("host")}/${post.image}`,
		};

		res.json(postWithImage);
	} catch (error) {
		console.log({ error: error.message });
		res.status(500).json({ error: error.message });
	}
}

async function addComment(req, res) {
	try {
		const { user, post, content } = req.body;

		// Find the user by ID
		const userObj = await User.findById(user);
		//  Find the post by ID
		const existingPost = await Post.findById(post);

		// Check user exists
		if (!userObj)
			return res.status(404).json({ message: "User not found" });
		// Check post exists
		if (!existingPost)
			return res.status(404).json({ message: "Post not found" });

		// Create a new comment object
		const newComment = new Comment({
			user,
			post,
			content,
		});

		// Save the new comment to the database
		await newComment.save();
		existingPost.comments.push(newComment._id);
		await existingPost.save();

		const returnComment = {
			_id: newComment._id,
			user: {
				firstName: userObj.firstName,
				lastName: userObj.lastName,
				userName: userObj.userName,
				email: userObj.email,
				avatar: userObj.avatar,
			},
			replies: newComment.replies,
			content: newComment.content,
			createdAt: newComment.createdAt,
			updatedAt: newComment.updatedAt,
		};

		console.log({ newComment, returnComment });

		res.json({
			message: "Comment added successfully",
			comment: returnComment,
		});
	} catch (error) {
		console.log({ error: error.message });
		res.status(500).json({ error: error.message });
	}
}

async function addCommentReply(req, res) {
	try {
		const { user, comment, content } = req.body;

		// Find the user by ID
		const userObj = await User.findById(user);

		// Find the comment by ID
		let existingComment = await Comment.findById(comment);

		// Check user exists
		if (!userObj)
			return res.status(404).json({ message: "User not found" });

		// Check comment exists
		if (!existingComment)
			return res.status(404).json({ message: "Comment not found" });

		// Create a new reply subDocument and add it to the existing comment's replies array
		const newReply = {
			user,
			content,
		};

		existingComment.replies.push(newReply);

		// Save the modified comment object to the database
		await existingComment.save();

		// Fetch the modified comment object again with all its replies and related user information
		existingComment = await Comment.findById(existingComment._id)
			.populate("user", "firstName lastName userName email avatar")
			.populate({
				path: "replies",
				populate: {
					path: "user",
					select: "firstName lastName userName email avatar",
				},
				options: { sort: { createdAt: -1 } }, // order: newest to oldest
			});

		res.json({
			message: "Reply added successfully",
			comment: existingComment,
		});
	} catch (error) {
		console.log({ error: error.message });
		res.status(500).json({ error: error.message });
	}
}

async function getSavedAndLikedStatus(req, res) {
	try {
		const { postId, userId } = req.params;

		// Find the user by ID
		const user = await User.findById(userId);
		//  Find the post by ID
		const post = await Post.findById(postId);

		// Check user exists
		if (!user) return res.status(404).json({ message: "User not found" });
		// Check post exists
		if (!post) return res.status(404).json({ message: "Post not found" });

		// Check if the user has liked or saved the post
		const isLiked = user.likedPosts.includes(postId);
		const isSaved = user.savedPosts.includes(postId);

		console.log({ isLiked, isSaved, liked: post.likes });

		res.json({
			isLiked,
			isSaved,
			likes: post.likes ?? 0,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: error.message });
	}
}

async function addLike(req, res) {
	try {
		const { postId, userId, isLiked } = req.body;

		// Find the user by ID
		const user = await User.findById(userId);
		//  Find the post by ID
		const post = await Post.findById(postId);

		if (!user || !post) {
			return res.status(404).json({ message: "User or post not found" });
		}

		// Toggle the isLiked property of the post in the user's likedPosts array
		const index = user.likedPosts.indexOf(postId);

		let likes = post.likes;

		if (!likes) {
			likes = 0;
		}

		console.log({ index, isLiked, likes });

		if ((isLiked && index === -1) || (!isLiked && index !== -1)) {
			if (isLiked) {
				user.likedPosts.push(postId);
				likes += 1;
			} else {
				user.likedPosts.splice(index, 1);
				if (likes > 0) {
					likes -= 1;
				}
			}
			// Set new likes
			post.likes = likes;
			await post.save();
			await user.save();
		}

		console.log({ isLiked, likes });

		res.json({
			isLiked,
			likes: post.likes,
			message: "Post ${isSaved ? 'liked' : 'disliked'}  successfully",
		});
	} catch (error) {
		console.log(error.message);
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
			message: `Post ${isSaved ? "saved" : "unsaved"} successfully`,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ error: error.message });
	}
}

async function getAllSavedPostsByUser(req, res) {
	try {
		const userId = req.params.userId;
		const user = await User.findById(userId);

		// Check user exists
		if (!user) return res.status(404).json({ message: "User not found" });

		// Fetch the saved posts and populate them using .populate()
		const posts = await Post.find({
			_id: { $in: user.savedPosts },
		})
			.sort("-createdAt")
			.populate({
				path: "categories",
				options: { sort: { createdAt: -1 } },
			})
			.exec();

		// Map the posts and add the image URLs
		const postsWithImages = posts.map((post) => ({
			key: post._id,
			id: post._id,
			title: post.title,
			content: post.content,
			readingMinutes: post.readingMinutes,
			slug: post.slug,
			likes: post.likes,
			tags: post.tags,
			categories: post.categories,
			createdAt: post.createdAt,
			imageUrl: `${req.protocol}://${req.get("host")}/${post.image}`,
		}));

		res.status(200).json({ posts: postsWithImages });
	} catch (error) {
		console.log({ error: error.message });
		res.status(500).json({ error: error.message });
	}
}

async function getUserSavedLikedCounts(req, res) {
	try {
		const userId = req.params.userId;
		const user = await User.findById(userId);

		// Check user exists
		if (!user) return res.status(404).json({ message: "User not found" });

		const savedLikedCounts = {
			likedCount: user.likedPosts.length,
			savedCount: user.savedPosts.length,
		};

		console.log({ savedLikedCounts });

		res.status(200).json({ savedLikedCounts });
	} catch (error) {
		console.log({ error: error.message });
		res.status(500).json({ error: error.message });
	}
}

module.exports = {
	getAllPosts,
	getPostById,
	getPostBySlug,
	getSavedAndLikedStatus,
	addLike,
	savePost,
	addComment,
	addCommentReply,
	getAllSavedPostsByUser,
	getUserSavedLikedCounts,
};

const fs = require("fs");
const path = require("path");

const Post = require("../../models/Post");
const Category = require("../../models/Category");
const { generateSlug } = require("../../utils/common");

async function getAllPosts(req, res) {
	try {
		const count = await Post.countDocuments();
		const posts = await Post.find().sort("-createdAt");

		// Map the posts and add the image URLs
		const postsWithImages = await Promise.all(
			posts.map(async (post) => {
				const categories = await Category.find({
					_id: { $in: post.categories },
				});

				return {
					id: post._id,
					title: post.title,
					content: post.content,
					readingMinutes: post.readingMinutes,
					slug: post.slug,
					tags: post.tags,
					createdAt: post.createdAt,
					imageUrl: `${req.protocol}://${req.get("host")}/${
						post.image
					}`,
					categories: categories.map((category) => ({
						id: category._id,
						title: category.title,
					})),
				};
			})
		);

		res.status(200).json({
			count,
			posts: postsWithImages,
			message: "Get posts successfully!",
		});
	} catch (error) {
		res.status(500).json({
			error: `Get posts failed: ${error.message}`,
		});
	}
}

async function getPostsByCondition(req, res) {
	const page = req.query.page || 1;
	const limit = req.query.limit || 5;
	const skip = (page - 1) * limit;
	const searchTerm = req.query.title || "";

	console.log("Pagination By: ", { page, limit, skip, searchTerm });

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
		const postsWithImages = await Promise.all(
			posts.map(async (post) => {
				const categories = await Category.find({
					_id: { $in: post.categories },
				});

				return {
					id: post._id,
					title: post.title,
					content: post.content,
					readingMinutes: post.readingMinutes,
					slug: post.slug,
					tags: post.tags,
					createdAt: post.createdAt,
					imageUrl: `${req.protocol}://${req.get("host")}/${
						post.image
					}`,
					categories: categories.map((category) => ({
						id: category._id,
						title: category.title,
					})),
				};
			})
		);

		res.status(200).json({
			count,
			posts: postsWithImages,
			message: "Get posts filter successfully!",
		});
	} catch (error) {
		res.status(500).json({
			error: `Get posts failed: ${error.message}`,
		});
	}
}

async function getPostById(req, res) {
	const postId = req.params.id;
	try {
		const post = await Post.findById(postId);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		// Map the posts and add the image URLs

		const categories = await Category.find({
			_id: { $in: post.categories },
		});

		const postWithImage = {
			id: post._id,
			title: post.title,
			content: post.content,
			readingMinutes: post.readingMinutes,
			slug: post.slug,
			tags: post.tags,
			categories,
			createdAt: post.createdAt,
			imageUrl: `${req.protocol}://${req.get("host")}/${post.image}`,
		};

		res.json({
			post: postWithImage,
			message: `Get post ${postId} successfully!`,
		});
	} catch (error) {
		res.status(500).json({
			error: `Get post ${postId} failed: ${error.message}`,
		});
	}
}

async function createPost(req, res) {
	const { title, content, readingMinutes, author, tags, categories } =
		req.body;
	const imagePath = req.file ? req.file.path : null;

	try {
		const post = new Post({
			title,
			content,
			readingMinutes,
			author,
			categories: JSON.parse(categories),
			tags: JSON.parse(tags),
			image: imagePath,
		});
		await generateSlug(post, Post);
		const savedPost = await post.save();
		res.json({ post: savedPost, message: "New post creation successful!" });
	} catch (error) {
		res.status(500).json({
			error: `Create post failed: ${error.message}`,
		});
	}
}

async function updatePost(req, res) {
	const postId = req.params.id;
	try {
		const post = await Post.findById(postId);

		if (!post) {
			return res
				.status(404)
				.json({ message: "Post not found with id: " + postId });
		}

		const { title, content, readingMinutes, tags, categories } = req.body;

		const imagePath = req.file ? req.file.path : post.image;

		// Check if the title change generate new slug
		if (title && title !== post.title) {
			post.title = title;
			await generateSlug(post); // Generate a unique slug before saving
		}

		// Update the post with the new data
		post.image = imagePath;
		post.tags = JSON.parse(tags);
		post.categories = JSON.parse(categories);
		post.content = content;
		post.readingMinutes = readingMinutes;

		await post.save();

		res.json({
			post,
			message: `Updated post ${req.params.id} successfully`,
		});
	} catch (error) {
		res.status(500).json({
			error: `Update post ${postId} failed: ${error.message}`,
		});
	}
}

async function deletePost(req, res) {
	const postId = req.params.id;
	try {
		const post = await Post.findByIdAndDelete(postId);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		// Remove the associated image file
		if (post.image) {
			const imagePath = path.join(
				__dirname,
				"../public/uploads",
				post.image
			);
			console.log("remove imagePath ==> ", imagePath);
			fs.unlink(imagePath, (error) => {
				if (error) {
					console.error("Error deleting image:", error);
				}
			});
		}

		res.json({ message: `Deleted post ${postId}` });
	} catch (error) {
		res.status(500).json({
			error: `Delete post ${postId} failed: ${error.message}`,
		});
	}
}

module.exports = {
	getAllPosts,
	getPostsByCondition,
	getPostById,
	createPost,
	updatePost,
	deletePost,
};

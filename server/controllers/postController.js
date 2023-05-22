const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const Post = require("../models/Post");

async function getAllPosts(req, res) {
	const page = req.query.page || 1;
	const limit = req.query.limit || 5;
	const skip = (page - 1) * limit;
	const searchTerm = req.query.title || "";

	console.log("Pagination ==> ", { page, limit, skip, searchTerm });

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
			createdAt: post.createdAt,
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
	const { title, content, author, tags } = req.body;
	const imagePath = req.file ? req.file.path : null;

	console.log("imagePath", imagePath);

	console.log("tags server ==> ", JSON.parse(tags));

	try {
		const post = new Post({
			title,
			content,
			author,
			tags: JSON.parse(tags),
			image: imagePath,
		});
		await generateSlug(post); // Generate a unique slug before saving
		const savedPost = await post.save();
		res.json({ post: savedPost, message: "Create new post successfully!" });
	} catch (error) {
		console.log("createPost error ==> ", createPost);
		res.status(500).json({ error: error.message });
	}
}

async function updatePost(req, res) {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res
				.status(404)
				.json({ message: "Post not found with id: " + req.params.id });
		}

		const { title, content, author, tags } = req.body;

		const imagePath = req.file ? req.file.path : post.image;

		// Check if the title change generate new slug
		if (title && title !== post.title) {
			post.title = title;
			await generateSlug(post); // Generate a unique slug before saving
		}

		// Update the post with the new data
		post.image = imagePath;
		post.tags = JSON.parse(tags);
		post.content = content || post.content;

		await post.save();

		res.json({
			post,
			message: `Update post ${req.params.id} successfully!`,
		});
	} catch (error) {
		console.log("updatePost error ==> ", createPost);
		res.status(500).json({ error: error.message });
	}
}

async function deletePost(req, res) {
	try {
		const post = await Post.findByIdAndDelete(req.params.id);
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

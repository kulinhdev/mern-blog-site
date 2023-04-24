const Post = require("../models/Post");

async function getAllPosts(req, res) {
	try {
		const posts = await Post.find();
		res.json(posts);
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
		res.json(post);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function createPost(req, res) {
	try {
		const post = new Post(req.body);
		const savedPost = await post.save();
		res.json(savedPost);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

async function updatePost(req, res) {
	try {
		const post = await Post.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}
		res.json(post);
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

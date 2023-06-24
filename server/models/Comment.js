const mongoose = require("mongoose");
const replySchema = require("./Reply");

const CommentSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.ObjectId,
			ref: "User",
			required: true,
		},
		post: {
			type: mongoose.ObjectId,
			ref: "Post",
			required: true,
		},
		content: String,
		replies: [replySchema],
	},
	{ timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;

const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const postSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	authorId: {
		type: mongoose.ObjectId,
		required: true,
	},
	publicationDate: {
		type: Date,
		default: Date.now,
	},
	tags: {
		type: [String],
		required: false,
	},
});

const Post = mongoose.model("Post", postSchema);

// Add the 'id' field as a Number type with auto-incrementing
postSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = Post;

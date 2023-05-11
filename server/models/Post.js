const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const slugify = require("slugify");

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
		unique: true,
	},
	content: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.ObjectId,
		ref: "User",
	},
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
	tags: {
		type: [String],
		required: false,
	},
	comments: [{ type: mongoose.ObjectId, ref: "Comment" }],
});

const Post = mongoose.model("Post", PostSchema);

// Add the 'id' field as a Number type with auto-incrementing
PostSchema.plugin(AutoIncrement, { inc_field: "id" });

// Generate slug before save
PostSchema.pre("save", function (next) {
	this.slug = slugify(this.title, {
		replacement: "-",
		trim: true,
		locale: "vi",
		lower: true,
		strict: true,
	});
	next();
});

module.exports = Post;

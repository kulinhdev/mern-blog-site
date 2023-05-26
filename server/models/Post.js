const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const slugify = require("slugify");

const PostSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
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
			required: true,
		},
		tags: {
			type: [
				{
					id: { type: String },
					text: { type: String },
				},
			],
			required: false,
		},
		categories: [{ type: mongoose.ObjectId, ref: "Category" }],
		comments: [{ type: mongoose.ObjectId, ref: "Comment" }],
	},
	{ timestamps: true }
);

// Generate slug before save
// PostSchema.pre("save", function (next) {
// 	this.slug = slugify(this.title, {
// 		replacement: "-",
// 		trim: true,
// 		locale: "vi",
// 		lower: true,
// 		strict: true,
// 	});
// 	next();
// });

// Add the 'id' field as a Number type with auto-incrementing
// PostSchema.plugin(AutoIncrement, { inc_field: "id" });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

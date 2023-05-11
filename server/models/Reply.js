const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
	content: String,
	createdAt: { type: Date, default: Date.now },
	user: {
		type: mongoose.ObjectId,
		ref: "User",
		required: true,
	},
});

module.exports = ReplySchema;
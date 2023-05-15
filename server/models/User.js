const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UserSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		firstName: { type: String },
		lastName: { type: String },
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		avatar: { type: String },
		token: { type: String },
		isVerified: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserSchema);

// Add the 'id' field as a Number type with auto-incrementing
// UserSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = User;

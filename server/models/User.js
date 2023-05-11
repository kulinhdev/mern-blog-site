const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String },
	lastName: { type: String },
	avatar: { type: String },
	role: { type: String, enum: ["admin", "user"], default: "user" },
	createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

// Add the 'id' field as a Number type with auto-incrementing
UserSchema.plugin(AutoIncrement, { inc_field: "id" });

module.exports = User;

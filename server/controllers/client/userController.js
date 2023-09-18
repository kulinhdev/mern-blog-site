const bcrypt = require("bcryptjs");
const express = require("express");

const User = require("../../models/User");

const router = express.Router();
async function updateProfile(req, res) {
	const { userId, userName, firstName, lastName, avatar } = req.body;

	try {
		// Find the user by ID
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Update user profile fields
		if (userName) {
			user.userName = userName;
		}

		if (firstName) {
			user.firstName = firstName;
		}

		if (lastName) {
			user.lastName = lastName;
		}

		if (avatar) {
			user.avatar = avatar;
		}

		// Save the updated user profile
		await user.save();

		return res
			.status(200)
			.json({ message: "Profile updated successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error.message });
	}
}

async function updatePassword(req, res) {
	const { userId, currentPassword, newPassword } = req.body;

	try {
		// Find the user by ID
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		// Check if the current password provided matches the stored hashed password
		const isPasswordCorrect = await bcrypt.compare(
			currentPassword,
			user.password
		);

		if (!isPasswordCorrect) {
			return res
				.status(401)
				.json({ message: "Current password is incorrect" });
		}

		// Hash the new password
		const hashedNewPassword = await bcrypt.hash(newPassword, 12);

		// Update the user's password
		user.password = hashedNewPassword;

		// Save the updated user profile
		await user.save();

		return res
			.status(200)
			.json({ message: "Password updated successfully" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: error.message });
	}
}

module.exports = { updateProfile, updatePassword };

const User = require("../../models/User");

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

module.exports = { updateProfile };

const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");

const configs = require("../../../config/keys");
const User = require("../../../models/User");

const router = express.Router();

function generateAccessToken(user) {
	const accessToken = jwt.sign(
		{ email: user.email, userId: user._id, role: user.role },
		configs.JWTSecret,
		{
			expiresIn: configs.JWTAccessTokenExpiresIn,
		}
	);
	return accessToken;
}

function generateRefreshToken(user) {
	const refreshToken = jwt.sign(
		{ email: user.email, _id: user._id, role: user.role },
		configs.JWTSecret,
		{
			expiresIn: configs.JWTRefreshTokenExpiresIn,
		}
	);
	return refreshToken;
}

router.post("/register", async (req, res) => {
	const { userName, firstName, lastName, email, password } = req.body;

	try {
		// Validate userName and email is unique
		const emailExists = await User.findOne({ email });
		const userNameExists = await User.findOne({ userName });

		if (emailExists) {
			return res.status(400).json({ message: "Email already taken." });
		}

		if (userNameExists) {
			return res.status(400).json({ message: "Username already taken." });
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const newUser = await User.create({
			userName,
			firstName,
			lastName,
			email,
			role: "admin",
			password: hashedPassword,
		});

		console.log("newUser", newUser);

		// Generate access token and refresh token
		const accessToken = generateAccessToken(newUser);
		const refreshToken = generateRefreshToken(newUser);

		// Save refresh token to user document
		newUser.token = refreshToken;
		await newUser.save();

		console.log({ newUser, accessToken, refreshToken });

		res.status(201).json({
			message: `Hi ${newUser.userName}, Your account has been successfully registered!`,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;

	// Validate user input
	if (!(email && password)) {
		res.status(400).send("Field email and password are required");
	}

	try {
		const existingUser = await User.findOne(
			{ email },
			{
				role: 0,
				isVerified: 0,
				createdAt: 0,
				updatedAt: 0,
				__v: 0,
			}
		);

		if (!existingUser) {
			return res
				.status(401)
				.json({ message: "Invalid email or password" });
		}

		const isPasswordCorrect = await bcrypt.compare(
			password,
			existingUser.password
		);

		if (!isPasswordCorrect) {
			return res.status(401).json({ message: "Invalid credentials." });
		}

		// Generate access token and refresh token
		const accessToken = generateAccessToken(existingUser);
		const refreshToken = existingUser.token;

		// Remove the password and token field from the existingUser object
		const resUser = {
			email: existingUser.email,
			firstName: existingUser.firstName,
			lastName: existingUser.lastName,
			userName: existingUser.userName,
			id: existingUser._id,
		};

		console.log("login admin", {
			user: resUser,
			access_token: accessToken,
			refresh_token: refreshToken,
		});

		res.status(200).json({
			user: resUser,
			access_token: accessToken,
			refresh_token: refreshToken,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
});

// API endpoint to handle refreshing the access token
router.post("/refresh-token", (req, res) => {
	const refreshToken = req.body.refresh_token;
	if (!refreshToken)
		return res
			.status(401)
			.json({ message: "refresh_token must be fill ...!" });

	jwt.verify(refreshToken, configs.JWTSecret, (error, user) => {
		console.log("client jwt.verify in /refresh-token ==> ", error, user);
		if (error) return res.status(403).json({ message: error.message });
		const accessToken = generateAccessToken(user);
		res.status(200).json({ access_token: accessToken });
	});
});

module.exports = router;

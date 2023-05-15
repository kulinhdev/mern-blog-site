const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const configs = require("../config/keys");
const User = require("../models/User");

const router = express.Router();

// Define configuration
configs.JWTAccessTokenExpiresIn = "1h";
configs.JWTRefreshTokenExpiresIn = "100y";
configs.JWTSecret =
	"JLJ1x8O2HwmcaYS3i8NxyixSFCaZqDH7gcWeko1ZCtOdaR52DqFfqBCcZAsKVMrwtgSLvFcx1PNL";

function generateAccessToken(user) {
	const accessToken = jwt.sign(
		{ email: user.email, userId: user._id },
		configs.JWTSecret,
		{
			expiresIn: configs.JWTAccessTokenExpiresIn,
		}
	);
	return accessToken;
}

function generateRefreshToken(user) {
	const refreshToken = jwt.sign(
		{ email: user.email, userId: user._id },
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
			password: hashedPassword,
		});

		// Generate access token and refresh token
		const accessToken = generateAccessToken(newUser);
		const refreshToken = generateRefreshToken(newUser);

		// Save refresh token to user document
		newUser.token = refreshToken;
		await newUser.save();

		console.log({ user: newUser, access_token: accessToken });

		res.status(201).json({
			access_token: accessToken,
			refresh_token: refreshToken,
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
		const existingUser = await User.findOne({ email });

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

		console.log({ user: existingUser, access_token: accessToken });

		res.status(200).json({
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
		if (error) return res.status(403).json({ message: error.message });
		const accessToken = generateAccessToken(user);
		res.status(200).json({ access_token: accessToken });
	});
});

module.exports = router;

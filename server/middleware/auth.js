const jwt = require("jsonwebtoken");
const configs = require("../config/keys");

const verifyToken = (req, res, next) => {
	configs.JWTSecret =
		"JLJ1x8O2HwmcaYS3i8NxyixSFCaZqDH7gcWeko1ZCtOdaR52DqFfqBCcZAsKVMrwtgSLvFcx1PNL";

	const requestToken =
		req.headers["x-access-token"] || req.headers.authorization;

	// Bearer <access_token>
	const token = requestToken?.split(" ")[1];

	// console.log("Middleware receive token ==> ", typeof token);

	if (!token) {
		return res
			.status(401)
			.send("Unauthorized - A token is required for authentication ...!");
	}
	try {
		const decoded = jwt.verify(token, configs.JWTSecret);
		req.user = decoded;
		console.log("Middleware decoded ==> ", decoded);
	} catch (err) {
		console.log("Middleware error ==> " + err.message);
		return res
			.status(401)
			.send("Unauthorized - Invalid Token: " + err.message);
	}
	return next();
};

const authorizeUser = (req, res, next) => {
	if (req.user.role !== "user") {
		return res.status(403).json({ message: "Access denied" });
	}
	next();
};

const authorizeAdmin = (req, res, next) => {
	if (req.user.role !== "admin") {
		return res.status(403).json({ message: "Access denied" });
	}
	next();
};

module.exports = verifyToken;

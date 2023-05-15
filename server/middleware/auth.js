const jwt = require("jsonwebtoken");
const configs = require("../config/keys");

const verifyToken = (req, res, next) => {
	const requestToken =
		req.body.token ||
		req.query.token ||
		req.headers["x-access-token"] ||
		req.headers.Authorization;

	// Bearer <access_token>
	const token = requestToken && requestToken.split(" ")[1];

	if (!token) {
		return res
			.status(401)
			.send("Unauthorized - A token is required for authentication ...!");
	}
	try {
		configs.JWTSecret =
			"JLJ1x8O2HwmcaYS3i8NxyixSFCaZqDH7gcWeko1ZCtOdaR52DqFfqBCcZAsKVMrwtgSLvFcx1PNL";

		const decoded = jwt.verify(token, configs.JWTSecret);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send("Unauthorized - Invalid Token ...!");
	}
	return next();
};

module.exports = verifyToken;

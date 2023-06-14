const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

configs = {
	listenPort: process.env.BE_LISTEN_PORT,
	exposePort: process.env.BE_EXPOSE_PORT,
	JWTSecret: process.env.JWT_SECRET,
	JWTExpiresIn: process.env.JWT_EXPIRES_IN,
	mongoDbConnectionString:
		process.env.NODE_ENV == "local"
			? process.env.MONGO_URI_DEV
			: process.env.MONGO_URI_PROD,
};

module.exports = configs;

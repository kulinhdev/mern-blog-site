require("dotenv").config();

module.exports = {
	listenPort: process.env.LISTEN_PORT,
	exposePort: process.env.EXPOSE_PORT,
	JWTSecret: process.env.JWT_SECRET,
	JWTExpiresIn: process.env.JWT_EXPIRES_IN,
};

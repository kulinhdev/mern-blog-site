require("dotenv").config();

module.exports = {
	listenPort: process.env.LISTEN_PORT,
	exposePort: process.env.EXPOSE_PORT,
};

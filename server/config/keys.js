const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const NODE_ENV = "production";
const JWT_SECRET =
	"JLJ1x8O2HwmcaYS3i8NxyixSFCaZqDH7gcWeko1ZCtOdaR52DqFfqBCcZAsKVMrwtgSLvFcx1PNL";
const JWT_ACCESS_EXPIRES_IN = "1h";
const JWT_REFRESH_EXPIRES_IN = "100y";
const MONGO_URI_DEV = "mongodb://localhost:27017/mern-blog-site";
const MONGO_URI_PROD =
	"mongodb+srv://kulinhdev202:SOuqf7HQHAiXIb2v@atlascluster.nsm89tt.mongodb.net/mern-blog-site";

configs = {
	listenPort: process.env.BE_LISTEN_PORT,
	exposePort: process.env.BE_EXPOSE_PORT,
	JWTSecret: process.env.JWT_SECRET || JWT_SECRET,
	JWTAccessTokenExpiresIn:
		process.env.JWT_ACCESS_EXPIRES_IN || JWT_ACCESS_EXPIRES_IN,
	JWTRefreshTokenExpiresIn:
		process.env.JWT_REFRESH_EXPIRES_IN || JWT_REFRESH_EXPIRES_IN,
	mongoDbConnectionString:
		process.env.NODE_ENV || NODE_ENV == "production"
			? process.env.MONGO_URI_PROD || MONGO_URI_PROD
			: process.env.MONGO_URI_DEV || MONGO_URI_DEV,
};

module.exports = configs;

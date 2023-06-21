const cors = require("cors");
const express = require("express");
const path = require("path");

const routes = require("./routes/routes");
const configs = require("./config/keys");
const connectToDatabase = require("./db/connect");

const app = express();

// Connect to database
connectToDatabase(configs.mongoDbConnectionString);

// Set middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public"
app.use(
	"/public/uploads",
	express.static(path.join(__dirname, "public/uploads"))
);

// Using the routes defined in routes.js
app.use("/", routes);

const expose_port = configs.exposePort || 5005;

// Listen port from docker server
app.listen(expose_port);

console.log(`App is listening on port: http://localhost:${expose_port}`);

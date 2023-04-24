const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/postRoutes");
const connectToDatabase = require("./db/connect");
const configs = require("./config/keys");

const app = express();

// Enable all CORS requests
app.use(cors());

// Connect to database
connectToDatabase();

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes
app.use("/api/posts", postRoutes);

// The API endpoint
app.get(["/", "/home"], (req, res) => {
	res.send({ message: "Hello From Express" });
});

// 404 Route
app.get("/*", (req, res) => {
	res.send({ message: "404 Not Found!" });
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
	// res.sendFile(path.join(__dirname+'/client/build/index.html'));
	res.send({ code: 404, error: "Request Not Found!" });
});

const listen_port = configs.listenPort || 5000;
// const expose_port = configs.exposePort || 5005;

// Listen port from docker server
app.listen(listen_port);

console.log(`App is listening on port: http://localhost:${5000}`);

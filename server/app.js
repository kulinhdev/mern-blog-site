const path = require("path");
const express = require("express");
const cors = require("cors");
const configs = require("./config/keys");
const postServerRoutes = require("./routes/postRoutes");
const postClientRoutes = require("./routes/postRoutesClient");
const authRoutes = require("./routes/authRoutes");
const connectToDatabase = require("./db/connect");
const verifyToken = require("./middleware/auth");

const app = express();

// Connect to database
connectToDatabase();

// Set middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder
app.use(
	"/public/uploads",
	express.static(path.join(__dirname, "public/uploads"))
);

// Define routes
app.use("/api/admin/posts", verifyToken, postServerRoutes);
app.use("/api/posts", postClientRoutes);
app.use("/api/auth", authRoutes);

// The API endpoint
app.get(["/", "/home"], verifyToken, (req, res) => {
	res.send({ message: "Hello From Express" });
});

// 404 Route
app.get("/*", (req, res) => {
	res.status(404).send("Request Not Found!");
});

const listen_port = configs.listenPort || 5000;
const expose_port = configs.exposePort || 5005;

// Listen port from docker server
app.listen(listen_port);

console.log(`App is listening on port: http://localhost:${expose_port}`);

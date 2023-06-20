const path = require("path");
const express = require("express");
const cors = require("cors");
const configs = require("./config/keys");
const adminPostRoutes = require("./routes/adminPost");
const clientPostRoutes = require("./routes/clientPost");
const adminAuthRoutes = require("./routes/adminAuth");
const adminCategoryRoutes = require("./routes/adminCategory");
const connectToDatabase = require("./db/connect");
const { verifyToken } = require("./middleware/auth");

const app = express();

// Connect to database
connectToDatabase(configs.mongoDbConnectionString);

// Set middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "public" folder: app.use(express.static('public'));
// app.use(
// 	"/public/uploads",
// 	express.static(path.join(__dirname, "public/uploads"))
// );
app.use(express.static("/public/uploads"));

// Client routes
app.get(["/", "/home"], (req, res) => {
	res.send({ message: "Hello From Express" });
});

// Admin routes
app.use("/api/admin/posts", verifyToken, adminPostRoutes);
app.use("/api/admin/categories", verifyToken, adminCategoryRoutes);

// The API endpoint
app.use("/api/posts", clientPostRoutes);
app.use("/api/auth", adminAuthRoutes);

// 404 Route
app.get("/*", (req, res) => {
	res.status(404).send("Request Not Found...!");
});

const expose_port = configs.exposePort || 5005;

// Listen port from docker server
app.listen(expose_port);

console.log(`App is listening on port: http://localhost:${expose_port}`);

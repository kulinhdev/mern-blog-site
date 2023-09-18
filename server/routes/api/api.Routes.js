const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/auth");

// *** Admin routes import ***
const adminPostRoutes = require("./admin/post.Routes");
const adminCategoryRoutes = require("./admin/category.Routes");
const adminAuthRoutes = require("./admin/auth.Routes");

// *** Client routes import ***
const userAuthRoutes = require("./client/user.Routes");
const clientAuthRoutes = require("./client/auth.Routes");
const clientPostRoutes = require("./client/post.Routes");
const clientCategoryRoutes = require("./client/category.Routes");

// === Client routes === \\
router.use("/auth", clientAuthRoutes);
router.use("/user", verifyToken, userAuthRoutes);
router.use("/posts", clientPostRoutes);
router.use("/categories", clientCategoryRoutes);

// === Admin routes === \\
router.use("/admin/auth", adminAuthRoutes);
router.use("/admin/posts", verifyToken, adminPostRoutes);
router.use("/admin/categories", verifyToken, adminCategoryRoutes);

module.exports = router;

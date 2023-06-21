const express = require("express");
const router = express.Router();
const { verifyToken } = require("../../middleware/auth");

// *** Admin routes import ***
const adminPostRoutes = require("./admin/post.Routes");
const adminCategoryRoutes = require("./admin/category.Routes");
const adminAuthRoutes = require("./admin/auth.Routes");

// *** Client routes import ***
const clientAuthRoutes = require("./client/auth.Routes");
const clientPostRoutes = require("./client/post.Routes");

// === Client routes === \\
router.use("/auth", clientAuthRoutes);
router.use("/posts", clientPostRoutes);

// === Admin routes === \\
router.use("/admin/auth", adminAuthRoutes);
router.use("/admin/posts", verifyToken, adminPostRoutes);
router.use("/admin/categories", verifyToken, adminCategoryRoutes);

module.exports = router;

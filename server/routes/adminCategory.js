const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryAdminController");
const upload = require("../config/uploadFile");

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get all categories by condition
router.get("/search", categoryController.getCategoriesByCondition);

// Get category by ID
router.get("/:id", categoryController.getCategoryById);

// Create a new category
router.post("/", upload.single("image"), categoryController.createCategory);

// Update an existing category
router.put("/:id", upload.single("image"), categoryController.updateCategory);

// Delete a category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;

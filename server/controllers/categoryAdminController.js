const Category = require("../models/Category");
const { generateSlug } = require("../utils/common");
const fs = require("fs");
const path = require("path");

async function getAllCategories(req, res) {
	try {
		const count = await Category.countDocuments();
		const categories = await Category.find();

		// Map the posts and add the image URLs
		const categoriesWithImages = categories.map((category) => ({
			id: category._id,
			title: category.title,
			content: category.content,
			slug: category.slug,
			createdAt: category.createdAt,
			imageUrl: `${req.protocol}://${req.get("host")}/${category.image}`,
		}));

		res.status(200).json({
			count,
			categories: categoriesWithImages,
			message: "Get all categories successful!",
		});
	} catch (error) {
		res.status(500).json({
			error: `Get categories failed: ${error.message}`,
		});
	}
}

async function getCategoriesByCondition(req, res) {
	const page = req.query.page || 1;
	const limit = 10;
	const skip = (page - 1) * limit;
	const searchTerm = req.query.title || "";

	try {
		const count = await Category.countDocuments({
			title: { $regex: searchTerm, $options: "i" },
		});
		const categories = await Category.find({
			title: { $regex: searchTerm, $options: "i" },
		})
			.sort("-createdAt")
			.skip(skip)
			.limit(limit);

		// Map the posts and add the image URLs
		const categoriesWithImages = categories.map((category) => ({
			id: category._id,
			title: category.title,
			content: category.content,
			slug: category.slug,
			createdAt: category.createdAt,
			imageUrl: `${req.protocol}://${req.get("host")}/${category.image}`,
		}));

		res.status(200).json({
			count,
			categories: categoriesWithImages,
			message: "Search categories successful!",
		});
	} catch (error) {
		res.status(500).json({
			error: `Get categories failed: ${error.message}`,
		});
	}
}

async function getCategoryById(req, res) {
	const categoryId = req.params.id;
	try {
		const category = await Category.findById(categoryId);
		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}

		// Map the posts and add the image URLs
		const categoryWithImage = {
			id: category._id,
			title: category.title,
			content: category.content,
			slug: category.slug,
			createdAt: category.createdAt,
			imageUrl: `${req.protocol}://${req.get("host")}/${category.image}`,
		};

		res.json({
			category: categoryWithImage,
			message: `Get category ${categoryId} successfully!`,
		});
	} catch (error) {
		res.status(500).json({
			error: `Get category ${categoryId} failed: ${error.message}`,
		});
	}
}

async function createCategory(req, res) {
	const { title, content } = req.body;
	const imagePath = req.file ? req.file.path : null;

	try {
		const category = new Category({
			title,
			content,
			image: imagePath,
		});
		await generateSlug(category, Category);
		const savedCategory = await category.save();
		res.json({
			category: savedCategory,
			message: "New category creation successful!",
		});
	} catch (error) {
		res.status(500).json({
			error: `Create category failed: ${error.message}`,
		});
	}
}

async function updateCategory(req, res) {
	const categoryId = req.params.id;
	try {
		const category = await Category.findById(categoryId);
		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}

		const { title, content } = req.body;

		const imagePath = req.file ? req.file.path : category.image;

		// Check if the title change generate new slug
		if (title && title !== category.title) {
			category.title = title;
			await generateSlug(category, Category);
		}

		category.image = imagePath;
		category.content = content;

		const updatedCategory = await category.save();
		res.json({
			category: updatedCategory,
			message: `Update category ${categoryId} successfully!`,
		});
	} catch (error) {
		res.status(500).json({
			error: `Update category failed: ${error.message}`,
		});
	}
}

async function deleteCategory(req, res) {
	const categoryId = req.params.id;
	try {
		const category = await Category.findById(req.params.id);
		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}

		await category.deleteOne();
		res.json({ message: `Category ${categoryId} deleted` });
	} catch (error) {
		res.status(500).json({
			error: `Delete category ${categoryId} failed: ${error.message}`,
		});
	}
}

module.exports = {
	getAllCategories,
	getCategoriesByCondition,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
};

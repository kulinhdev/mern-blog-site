const Category = require("../models/Category");

async function getAllCategories(req, res) {
	try {
		const categories = await Category.find();
		res.json(categories);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

async function getCategoryById(req, res) {
	try {
		const category = await Category.findById(req.params.id);
		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}
		res.json(category);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

async function createCategory(req, res) {
	const { title, slug, image } = req.body;
	const category = new Category({ title, slug, image });

	try {
		const newCategory = await category.save();
		res.status(201).json(newCategory);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}

async function updateCategory(req, res) {
	const { title, slug, image } = req.body;

	try {
		const category = await Category.findById(req.params.id);
		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}

		category.title = title;
		category.slug = slug;
		category.image = image;

		const updatedCategory = await category.save();
		res.json(updatedCategory);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}

async function deleteCategory(req, res) {
	try {
		const category = await Category.findById(req.params.id);
		if (!category) {
			return res.status(404).json({ message: "Category not found" });
		}

		await category.deleteOne();
		res.json({ message: "Category deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}

module.exports = {
	getAllCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
};

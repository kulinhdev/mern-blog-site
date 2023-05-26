const slugify = require("slugify");

async function generateSlug(newItem, Model) {
	let slug = slugify(newItem.title, {
		replacement: "-",
		trim: true,
		lower: true,
		strict: true,
	});
	newItem.slug = slug;
	let isFound = await Model.findOne({ slug }).exec();
	if (isFound) {
		let count = 1;
		let newSlug = slug;
		while (isFound) {
			newSlug = `${slug}-${count}`;
			isFound = await Model.findOne({ slug: newSlug }).exec();
			count++;
		}
		newItem.slug = newSlug;
	}
}

module.exports = { generateSlug };

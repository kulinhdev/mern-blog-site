const multer = require("multer");
const slugify = require("slugify");

// Configure Multer for file upload
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/uploads"); // Specify the folder where uploaded files will be stored
	},
	filename: function (req, file, cb) {
		console.log("multer check ==> ", req.body);
		const originalName = file.originalname;
		const extension = originalName.split(".").pop();
		const fileName = `${slugify(req.body.title, {
			lower: true,
			strict: true,
		})}-${Date.now()}.${extension}`;
		cb(null, fileName); // Set the filename of the uploaded file
	},
});

const upload = multer({ storage: storage });

module.exports = upload;

const express = require("express");
const router = express.Router();
const postController = require("../../../controllers/admin/postsController");
const upload = require("../../../config/uploadFile");

router.get("/", postController.getAllPosts);

router.get("/search", postController.getPostsByCondition);

router.get("/:id", postController.getPostById);

router.post("/", upload.single("image"), postController.createPost);

router.put("/:id", upload.single("image"), postController.updatePost);

router.delete("/:id", postController.deletePost);

module.exports = router;

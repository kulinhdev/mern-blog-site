const express = require("express");
const router = express.Router();
const postController = require("../../../controllers/client/postsController");

router.get("/", postController.getAllPosts);

router.get("/:slug", postController.getPostBySlug);

module.exports = router;

const express = require("express");
const router = express.Router();
const postController = require("../../../controllers/client/postsController");

router.get("/", postController.getAllPosts);

router.get("/:slug", postController.getPostBySlug);

router.get("/:postId/user/:userId", postController.getSavedAndLiked);

router.post("/save", postController.savePost);

router.post("/like", postController.addLike);

router.post("/comment", postController.addComment);

router.post("/comment-reply", postController.addCommentReply);

module.exports = router;

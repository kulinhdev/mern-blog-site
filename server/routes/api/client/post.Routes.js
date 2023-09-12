const express = require("express");
const router = express.Router();
const postController = require("../../../controllers/client/postsController");

router.get("/", postController.getAllPosts);

router.get("/id/:id", postController.getPostById);

router.get("/slug/:slug", postController.getPostBySlug);

router.get("/:postId/user/:userId", postController.getSavedAndLikedStatus);

router.post("/save", postController.savePost);

router.get("/user/:userId/saved", postController.getAllSavedPostsByUser);

router.get(
	"/user/:userId/saved-liked-counts",
	postController.getUserSavedLikedCounts
);

router.post("/like", postController.addLike);

router.post("/comment", postController.addComment);

router.post("/comment-reply", postController.addCommentReply);

module.exports = router;

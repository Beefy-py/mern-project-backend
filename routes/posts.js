const express = require("express");

const router = express.Router();
const {
  getPosts,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
  reactPost,
  // getComments,
} = require("../controllers/posts");

router.get("/", getPosts);
router.post("/", createPost);
router.get("/:id", getSinglePost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

// like or dislike post
router.patch("/:id/react", reactPost);
// get comments for single post
// router.get("/:id/comments", getComments);

module.exports = router;

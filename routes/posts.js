const express = require("express");
const auth = require("../middleware/auth");

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
router.post("/", auth, createPost);
router.get("/:id", auth, getSinglePost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

// like or dislike post
router.patch("/:id/react", auth, reactPost);
// get comments for single post
// router.get("/:id/comments", getComments);

module.exports = router;

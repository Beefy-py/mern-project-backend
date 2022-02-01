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
  getPostsBySearch,
  commentPost,
} = require("../controllers/posts");

router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.post("/", auth, createPost);
router.get("/:id", auth, getSinglePost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

router.post("/:id/comment", auth, commentPost);

// like or dislike post
router.patch("/:id/react", auth, reactPost);

module.exports = router;

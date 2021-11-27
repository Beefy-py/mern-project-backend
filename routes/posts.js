const express = require("express");

const router = express.Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  reactPost,
} = require("../controllers/posts");

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

// like or dislike post
router.patch("/:id/react", reactPost);

module.exports = router;

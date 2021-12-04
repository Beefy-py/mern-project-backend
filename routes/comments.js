const express = require("express");

const router = express.Router();
const {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comments");

router.get("/", getComments);
router.post("/", createComment);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;

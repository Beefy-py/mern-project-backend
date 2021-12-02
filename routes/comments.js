const express = require("express");

const router = express.Router();
const { getComments, createComment } = require("../controllers/comments");

router.get("/", getComments);
router.post("/", createComment);
// router.patch("/comments/:id", updateComment);
// router.delete("/comments/:id", deleteComment);

module.exports = router;

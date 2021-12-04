const mongoose = require("mongoose");
const { Comment } = require("../models/comments");

module.exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort("-commentedAt");
    res.status(200).send(comments);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports.createComment = async (req, res) => {
  const comment = req.body;

  if (!mongoose.Types.ObjectId.isValid(comment.postId)) {
    console.log(comment.postId + " not valid post id");
    return res
      .status(400)
      .send(`${comment.postId} is not a valid post ID to comment on`);
  }

  const newComment = new Comment(comment);

  try {
    await newComment.save();
    res.status(201).send(newComment);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.updateComment = async (req, res) => {
  const { id: commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(404).send("comment with the givin id not found.");
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      req.body,
      { new: true }
    );
    res.send("updated comment to " + updatedComment.body);
  } catch (err) {
    console.log(err);
  }
};

module.exports.deleteComment = async (req, res) => {
  const { id: commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(404).send("comment with the givin id not found.");
  }

  try {
    await Comment.findByIdAndDelete(commentId);
    res.send("Comment succesfully deleted.");
  } catch (err) {
    console.log(err);
  }
};

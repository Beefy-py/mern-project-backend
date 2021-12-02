const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  postId: { type: String, required: true },
  author: { type: String, required: true },
  body: { type: String },
  commentedAt: { type: Date, default: Date },
});

module.exports.commentSchema = commentSchema;
module.exports.Comment = mongoose.model("Comment", commentSchema);

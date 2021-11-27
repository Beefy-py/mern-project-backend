const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  author: { type: String, required: true },
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  dislikeCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date,
  },
});

const post = mongoose.model("Post", postSchema);

module.exports.Post = post;

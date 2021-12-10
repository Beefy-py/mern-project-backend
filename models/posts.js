const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  authorId: { type: String, required: true },
  authorName: { type: String },
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  dislikes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date,
  },
});

const post = mongoose.model("Post", postSchema);

module.exports.Post = post;

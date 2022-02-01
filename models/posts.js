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
  comments: {
    type: [
      {
        authorId: { type: String, required: true },
        authorName: { type: String },
        body: { type: String, required: true },
        commentedAt: {
          type: Date,
          default: Date,
        },
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date,
  },
});

const post = mongoose.model("Post", postSchema);

module.exports.Post = post;

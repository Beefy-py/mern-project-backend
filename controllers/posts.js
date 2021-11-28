const mongoose = require("mongoose");
const { Post } = require("../models/posts");

module.exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort("createdAt");
    res.status(200).send(posts);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports.createPost = async (req, res) => {
  console.log(req.body.tags, typeof req.body.tags);

  const tags = req.body.tags.includes(",")
    ? req.body.tags.split(",")
    : req.body.tags.split(" ");
  const post = { ...req.body, tags };
  const newPost = new Post(post);

  try {
    await newPost.save();
    res.status(201).send(newPost);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports.updatePost = async (req, res) => {
  const { id: postId } = req.params;

  const tags =
    typeof req.body.tags === "object"
      ? req.body.tags.join(",").split(",")
      : req.body.tags.split(",");
  const post = { ...req.body, tags };

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send("Not a valid Id for a post.");

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { postId, ...post },
      {
        new: true,
      }
    );

    console.log(updatedPost.title, updatedPost.tags);

    res.send(updatedPost);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.deletePost = async (req, res) => {
  const { id: postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send("Not a valid Id for a post.");

  try {
    await Post.findByIdAndRemove(postId);
    res.send(`Post with id ${postId} deleted succesfully`);
  } catch (err) {
    console.log(err);
  }
};

module.exports.reactPost = async (req, res) => {
  const { id: postId } = req.params;
  const { like } = req.query;

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send("Not a valid Id for a post.");

  const post = await Post.findById(postId);

  // decide like/dislike
  const reaction =
    like === "1"
      ? { likeCount: post.likeCount + 1 }
      : { dislikeCount: post.dislikeCount + 1 };

  console.log(post.title, reaction);

  const updatePost = await Post.findByIdAndUpdate(postId, reaction, {
    new: true,
  });

  res.send(updatePost);
};

const mongoose = require("mongoose");
const { Post } = require("../models/posts");

module.exports.getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const limit = 9;
    const startIndex = (Number(page) - 1) * limit;
    const total = await Post.countDocuments({});
    const posts = await Post.find()
      .sort("-createdAt")
      .limit(limit)
      .skip(startIndex);

    res.status(200).send({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports.getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.send({ data: posts });
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports.getSinglePost = async (req, res) => {
  const { id: postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send("Not a valid Id for a post.");

  try {
    const post = await Post.findById(postId);
    res.status(200).send(post);
  } catch (err) {
    res.status(404).send("Post not found");
  }
};

module.exports.createPost = async (req, res) => {
  let tags;

  if (!typeof req.body.tags === "object") {
    tags = req.body.tags.includes(",")
      ? req.body.tags.split(",")
      : req.body.tags.split(" ");
  } else {
    tags = req.body.tags;
  }

  const post = { ...req.body, tags };
  const newPost = new Post({ ...post, authorId: req.userId });

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

  if (!req.userId) return res.status(403).send("Unauthenticated.");

  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(404).send("Not a valid Id for a post.");

  const post = await Post.findById(postId);

  if (like === "1") {
    const index = post.likes.findIndex((usrID) => usrID === String(req.userId));

    if (index === -1) {
      post.likes.push(req.userId);
      post.dislikes = post.dislikes.filter(
        (usrID) => usrID !== String(req.userId)
      );
    } else {
      post.likes = post.likes.filter((usrID) => usrID !== String(req.userId));
    }
  } else {
    const index = post.dislikes.findIndex(
      (usrID) => usrID === String(req.userId)
    );
    if (index === -1) {
      post.dislikes.push(req.userId);
      post.likes = post.likes.filter((usrID) => usrID !== String(req.userId));
    } else {
      post.dislikes = post.dislikes.filter(
        (usrID) => usrID !== String(req.userId)
      );
    }
  }

  const updatePost = await Post.findByIdAndUpdate(postId, post, {
    new: true,
  });

  res.send(updatePost);
};

module.exports.commentPost = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const { authorId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(authorId))
    return res.status(404).send("Not a valid Id for a post.");

  const post = await Post.findById(id);

  post.comments.push(req.body);
  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });
  res.send(updatedPost);
};

// module.exports.getComments = async (req, res) => {
//   const { id: postId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(postId))
//     return res.status(404).send("Not a valid Id for a post.");

//   try {
//     const postComments = await Comment.find({ postId: postId });
//     res.status(200).send(postComments);
//   } catch (err) {
//     res.status(404).send("comments not found for that post id");
//   }
// };

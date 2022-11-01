const Post = require("../models/post.model");
const User = require("../models/user.model");

// Create a Post
exports.submitPost = async (req, res) => {
  try {
    let commonPostInfo = {
      author: req.body.author,
      userId: req.body.userId,
      types: req.body.types,
      title: req.body.title,
      desc: req.body.desc,
      state: req.body.state,
      city: req.body.city,
      email: req.body.email,
      phone: req.body.phone,
    };

    let postsToSave = [];

    postsToSave.push(new Post(commonPostInfo));

    for (let i = 0; i < postsToSave.length; i++) {
      let post = await postsToSave[i].save();
      if (!post) throw new Error("Error while saving post");
    }

    res.status(200).json({
      success: true,
      message: "Post submitted successfully",
      post: postsToSave[0],
    });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).send({ error: true, message: err.message });
    }
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

// Update a Post
exports.updatePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (post.userId !== req.body.userId)
      throw new Error("You can update only your post");

    await post.updateOne({ $set: req.body.data });

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

// Delete a Post
exports.deletePost = async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) throw new Error("Invalid post");

    await post.deleteOne();

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

// Get a Post
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    let page = req.query.page || 1;
    let { team, player, trainer } = req.query;
    console.log(team, player, trainer);
    let amountOnPage = 9;
    let typeConditions = [];
    if (player) typeConditions.push({ "types.player": true });
    if (trainer) typeConditions.push({ "types.trainer": true });
    if (team) typeConditions.push({ "types.team": true });
    let searchCondition = {
      active: true,
      $or: typeConditions,
      ...(team ? { "type.team": team } : {}),
      ...(player ? { "type.player": player } : {}),
      ...(trainer ? { "type.trainer": trainer } : {}),
    };
    console.log(searchCondition);
    let posts = await Post.find(searchCondition)
      .sort({ _id: -1 })
      .skip((page - 1) * amountOnPage)
      .limit(amountOnPage);

    let totalPosts = await Post.countDocuments({});

    let totalPages = Math.ceil(totalPosts / amountOnPage);

    res.status(200).json({
      success: true,
      posts: [...posts],
      totalPages: totalPages,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

// get timeline posts
exports.getTimeline = async (req, res) => {
  console.log(req.params.userId);
  try {
    let currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });

    res.status(200).json({
      success: true,
      posts: userPosts,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

exports.getAllUsersPost = async (req, res) => {
  try {
    let user = await User.findOne({ username: req.params.username });
    let page = req.query.page || 1;
    let amountOnPage = 6;
    let posts = await Post.find({ userId: user._id })
      .sort({ _id: -1 })
      .skip((page - 1) * amountOnPage)
      .limit(amountOnPage);

    let totalPosts = await Post.countDocuments({});

    let totalPages = Math.ceil(totalPosts / amountOnPage);

    res.status(200).json({
      success: true,
      posts: [...posts],
      totalPages: totalPages,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// CREATE POST
router.post("/create", async (req, res) => {
  const { userId, username, content } = req.body;

  const post = new Post({ userId, username, content });
  await post.save();

  res.json({ message: "Post created" });
});

// GET ALL POSTS (FEED)
router.get("/all", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// LIKE POST
router.post("/like/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.likes += 1;
  await post.save();

  res.json({ message: "Liked" });
});

module.exports = router;
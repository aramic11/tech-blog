const router = require('express').Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// View all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.json(postData);
  } catch (err) {
    res.status(400).json({ message: "Failed to retrieve posts" });
  }
});

// Add post
router.post("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json({ message: "Failed to create post" });
  }
});

// Update post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: { id: req.params.id },
      }
    );
    if (!postData) {
      return res
        .status(404)
        .json({ message: "Post not found with specified ID" });
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json({ message: "Failed to update post" });
  }
});

// Delete post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      return res
        .status(404)
        .json({ message: "Post not found with specified ID" });
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post" });
  }
});

module.exports = router;
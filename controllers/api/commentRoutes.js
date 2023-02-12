const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// View comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.json(comments);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add comments
router.post('/', withAuth, async (req, res) => {
  try {
    const { comment, post_id } = req.body;
    const newComment = await Comment.create({
      comment,
      user_id: req.session.user_id,
      post_id
    });
    res.json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
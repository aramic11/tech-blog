const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Route to get all posts, excluding 'createdAt' for posts and comments, and excluding 'password' for users
router.get('/', async (req, res) => {
  try {
    // Find all posts and include related user and comment data
    const allPostsData = await Post.findAll({
      order: [['updatedAt', 'DESC']],
      attributes: { exclude: ['createdAt'] },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }
        },
        {
          model: Comment,
          order: [['updatedAt', 'DESC']],
          attributes: { exclude: ['createdAt'] },
          include: {
            model: User,
            attributes: { exclude: ['password'] }
          }
        }
      ]
    });

    // Convert the post data from sequelize objects to plain objects
    const posts = allPostsData.map((post) => post.get({ plain: true }));

    // Render the 'homepage' view and pass in the posts data and logged in status
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to get a user's dashboard, excluding 'createdAt' for posts and comments, and excluding 'password' for users
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find all posts by the current user and include related user and comment data
    const dashboardData = await Post.findAll({
      order: [['updatedAt', 'DESC']],
      attributes: { exclude: ['createdAt'] },
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] }
        },
        {
          model: Comment,
          order: [['updatedAt', 'DESC']],
          attributes: { exclude: ['createdAt'] },
          include: {
            model: User,
            attributes: { exclude: ['password'] }
          }
        }
      ]
    });

    // Convert the post data from sequelize objects to plain objects
    const posts = dashboardData.map((post) => post.get({ plain: true }));

    // Render the 'dashboard' view and pass in the posts data and logged in status
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// Route to show the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
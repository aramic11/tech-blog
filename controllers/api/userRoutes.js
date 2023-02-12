const router = require('express').Router();
const { User } = require('../../models');

// Register a new user
router.post('/', async (req, res) => {
  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username: req.body.username } });

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists. Please choose a different one.' });
    }

    // Create a new user
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    // Save the user data to the session
    req.session.user_id = newUser.id;
    req.session.logged_in = true;
    req.session.save();

    return res.json({ user: newUser.username, message: 'You are now registered and logged in!' });

  } catch (err) {
    return res.status(500).json({ message: 'An error occurred while trying to register the user.' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    // Find the user with the provided username
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      return res.status(400).json({ message: 'Incorrect username or password.' });
    }

    // Verify the password
    const isPasswordValid = await user.checkPassword(req.body.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Incorrect username or password.' });
    }

    // Save the user data to the session
    req.session.user_id = user.id;
    req.session.logged_in = true;
    req.session.save();

    return res.json({ user: user.username, message: 'You are now logged in!' });

  } catch (err) {
    return res.status(500).json({ message: 'An error occurred while trying to log in the user.' });
  }
});

// Logout a user
router.post('/logout', (req, res) => {
  if (!req.session.logged_in) {
    return res.status(404).json({ message: 'No user is currently logged in.' });
  }

  req.session.destroy(() => {
    return res.status(204).end();
  });
});

module.exports = router;
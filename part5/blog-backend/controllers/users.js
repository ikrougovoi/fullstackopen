const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User
      .find({})
      .populate('blogs', { url: 1, title: 1, author: 1});

    res.json(users.map(u => u.toJSON()));
  } catch (exception) {
    next(exception);
  };
});

usersRouter.post('/', async (req, res, next) => {

  if (req.body.username === undefined || req.body.password === undefined || req.body.name === undefined) {
    return res.status(400).json({ error: 'username and password are required' });
  };

  if (req.body.password.length < 3) {
    return res.status(400).json({ error: 'password must be atleast 3 characters long' });
  };

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
  
    const user = new User({
      username: req.body.username,
      name: req.body.name,
      passwordHash
    });

    const savedUser = await user.save();
    res.json(savedUser.toJSON());

  } catch (exception) {
    next(exception);
  };

});

usersRouter.post('/login', async (req, res, next) => {
  const body = req.body;

  try {
    const user = await User.findOne({ username: body.username });

    const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: 'invalid username or password' });
    };

    const userForToken = {
      username: user.username,
      id: user._id
    };

    const token = jwt.sign(userForToken, process.env.SECRET);
    res.status(200).json({ token, username: user.username, name: user.name });

  } catch (exception) {
    next(exception);
  };
});

module.exports = usersRouter;
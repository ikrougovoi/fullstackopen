const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

blogRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { username: 1, name: 1 });

    res.json(blogs.map(blog => blog.toJSON()));
  } catch (exception) {
    next(exception);
  };
});

blogRouter.post('/', async (req, res, next) => {
  const blog = new Blog(req.body);

  if (blog.likes === undefined) {
    blog.likes = 0;
  };

  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    };

    const user = await User.findById(decodedToken.id);

    blog.user = user._id;

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog.toJSON());
  } catch (exception) {
    next(exception);
  };
});

blogRouter.put('/:id', async (req, res, next) => {

  const submittedUpdatedBlog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  };

  try {
    const updatedBlog = await Blog
      .findByIdAndUpdate(req.params.id, submittedUpdatedBlog, { new: true })
      .populate('user', { username: 1, user: 1});

    res.json(updatedBlog.toJSON());
  } catch (exception) {
    next(exception);
  };
});

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET);

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    };

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(401).json({ error: 'token missing or invalid' });
    };

    const blog = await Blog.findById(req.params.id);

    if(!blog) {
      return res.status(404).json({ error: 'blog post not found' });
    };

    if (user._id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(req.params.id);
      user.blogs = user.blogs.filter(b => b.toString() !== blog._id.toString());
      await user.save();
      res.status(204).end();
    };

  } catch (exception) {
    next(exception);
  };
});

module.exports = blogRouter;
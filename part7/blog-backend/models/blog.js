const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    required: true
  },
  author: String,
  url: {
    type: String,
    minlength: 8,
    required: true
  },
  likes: Number,
  comments: {
    type: Array
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
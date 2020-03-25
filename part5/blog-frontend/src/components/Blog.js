import React, { useState } from 'react';
import PropTypes from 'prop-types';
const Blog = ({ blog, ownedByUser, increaseLikes, deleteBlog }) => {

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    ownedByUser: PropTypes.bool.isRequired,
    increaseLikes: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLikeBtn = async (blog) => {
    const changedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    };
    increaseLikes(blog.id, changedBlog);
  };

  const handleBlogDelete = (blog) => {
    let confirmDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
    if (confirmDelete) {
      deleteBlog(blog.id, blog);
    }
  };

  return (
    <div style={blogStyle} className='blogItem' onClick={toggleVisibility}>
      <div>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible} className='toggleableContent'>
        {blog.url}<br/>
        likes {blog.likes} <button onClick={() => handleLikeBtn(blog)}>like</button><br/>
        {blog.user.name}<br/>
        {ownedByUser ? <button onClick={() => handleBlogDelete(blog)}>remove</button> : ''}
      </div>
    </div>
  );
};

export default Blog;

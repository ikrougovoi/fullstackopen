import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';

// components
import BlogComments from './BlogComments';

// actions & reducers
import { setNotification } from '../reducers/notificationReducer';
import { likeBlog, removeBlog, addBlogComment } from '../reducers/blogReducer';

// bootstrap
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const Blog = ({ blog, user }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const dispatchNotification = (type, content, duration = 3) => {
    dispatch(setNotification(type, content, duration));
  };

  // increase Likes
  const handleIncreaseLikes = async () => {
    try {
      await dispatch(likeBlog(blog.id));
      dispatchNotification('success', `${blog.title} increased to ${blog.likes + 1} likes`);
    } catch (exception) {
      dispatchNotification('warning', `Could not increase likes for ${blog.title}`);
    }
  };

  // delete blog
  const handleDeleteBlog = async () => {
    try {
      let confirmDelete = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`);
      if (confirmDelete) {
        dispatch(removeBlog(blog.id));
        dispatchNotification('success', `Removed ${blog.title}.`);
        history.push('/');
      }
    } catch (exception) {
      dispatchNotification('warning', `Could not remove ${blog.title}.`);
    }
  };

  // add comment
  const addNewComment = async (comment) => {
    if (comment === '') {
      dispatchNotification('warning', 'Comment cannot be blank.');
      return;
    }
    try {
      await dispatch(addBlogComment(blog.id, comment));
      dispatchNotification('success', `Added a new comment to ${blog.title}`);
    } catch (exception) {
      dispatchNotification('warning', 'Could not add comment.');
      throw exception;
    }
  };

  if (!blog) {
    return null;
  }

  return (
    <>
      <Row>
        <Col xs lg={{ span: 8, offset: 2 }}>
          <h2>{blog.title}</h2>
          <h6>by {blog.author} <Button variant='outline-primary' size='sm' onClick={handleIncreaseLikes}>{blog.likes} <i className='fas fa-thumbs-up'></i></Button></h6>
          <p>
            <a href={blog.url}>{blog.url}</a><br/>
          </p>
          <p>
            added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link> { blog.user.username === user.username ? <Button variant='danger' size='sm' onClick={handleDeleteBlog}>Remove</Button> : null }
          </p>
          <BlogComments comments={blog.comments} addNewComment={addNewComment} />
        </Col>
      </Row>
    </>
  );
};

export default Blog;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddBlog = ({ createBlog }) => {

  AddBlog.propTypes = {
    createBlog: PropTypes.func.isRequired
  };

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  });

  const blankNewBlog = {
    title: '',
    author: '',
    url: ''
  };

  const handleNewBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog(blankNewBlog);
  };

  return (
    <div>
      <h4>Add a Blog</h4>
      <form className='form' onSubmit={handleNewBlog}>
        Title:  <input type='text' id='title' value={newBlog.title} onChange={ (event) => setNewBlog({ ...newBlog, title: event.target.value }) } /><br/>
        Author: <input type='text' id='author' value={newBlog.author} onChange={ (event) => setNewBlog({ ...newBlog, author: event.target.value }) } /><br/>
        URL:    <input type='text' id='url' value={newBlog.url} onChange={ (event) => setNewBlog({ ...newBlog, url: event.target.value }) } /><br/>
        <button type="submit" id='add-blog-button'>Add</button>
      </form>
    </div>
  );
};

export default AddBlog;
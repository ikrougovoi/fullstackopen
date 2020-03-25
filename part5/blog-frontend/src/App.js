import React, { useState, useEffect } from 'react';

// components
import Blog from './components/Blog';
import AddBlog from './components/AddBlog';
import Login from './components/Login';
import Notification from './components/Notification';
import User from './components/User';
import Toggleable from './components/Toggleable';

// services
import blogService from './services/blogs';
import userService from './services/users';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [message, setMessage] = useState({
    type: '',
    text: ''
  });

  const blankMessage = {
    type: '',
    text: ''
  };

  useEffect(() => {
    const retrieveBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    try {
      retrieveBlogs();
    } catch (exception) {
      console.log(exception);
    }
  }, []);

  useEffect(() => {
    const localStorageUser = window.localStorage.getItem('blogAppUser');
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // sort blogs
  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes;
  });

  const showMessage = (type, text) => {
    setMessage({
      type: type,
      text: text
    });
    setTimeout(() => {
      setMessage(blankMessage);
    }, 5000);
  };

  const handleLogin = async (credentials) => {
    if (credentials.username === '' || credentials.password === '') {
      showMessage('warning', 'Username and Password cannot be blank.');
      return;
    }
    try {
      const user = await userService.login(credentials);
      window.localStorage.setItem('blogAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      showMessage('success', `${user.name} successfully authenticated.`);
    } catch (exception) {
      showMessage('warning', 'Invalid username or password.');
      setUser(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem('blogAppUser');
    showMessage('success', 'Logged out.');
  };

  const handleNewBlog = async (newBlog) => {
    if (!newBlog.title || !newBlog.author || !newBlog.url) {
      showMessage('warning', 'Title, Author and URL cannot be blank.');
      return;
    }

    try {
      const savedBlog = await blogService.create(newBlog);
      console.log(savedBlog);
      setBlogs(blogs.concat(savedBlog));
      showMessage('success', `A new blog ${newBlog.title} by ${newBlog.author} added.`);
    } catch (exception) {
      showMessage('warning', 'Could not create new blog');
    }
  };

  const handleIncreaseLikes = async (id, changedBlog) => {
    try {
      const updatedBlog = await blogService.increaseLikes(id, changedBlog);
      console.log(updatedBlog);
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog));
      showMessage('success', `${changedBlog.title} increased to ${changedBlog.likes} likes`);
      return updatedBlog;
    } catch (exception) {
      showMessage('warning', `Could not increase likes for ${changedBlog.title}`);
    }
  };

  const handleDeleteBlog = async (id, blog) => {
    try {
      await blogService.deleteBlog(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
      showMessage('success', `Removed ${blog.title}.`);
    } catch (exception) {
      showMessage('warning', 'Could not remove blog.');
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Login to the Application</h2>
        <Notification message={message} />
        <Login postLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div>
      <h2 className='brand'>Blog Trakr</h2>
      <User user={user} handleLogout={handleLogout} />
      <Notification message={message} />
      <Toggleable buttonLabel='Add Blog'>
        <AddBlog createBlog={handleNewBlog} />
      </Toggleable>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} ownedByUser={blog.user.username === user.username} blog={blog} increaseLikes={handleIncreaseLikes} deleteBlog={handleDeleteBlog} />
      )}
    </div>
  );
};

export default App;
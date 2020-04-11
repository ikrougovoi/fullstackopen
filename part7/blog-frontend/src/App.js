import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// components
import Header from './components/Header';
import Blog from './components/Blog';
import Blogs from './components/Blogs';
import AddBlog from './components/AddBlog';
import Login from './components/Login';
import Notification from './components/Notification';
import Users from './components/Users';
import User from './components/User';

// actions & reducers
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import { userReturned } from './reducers/userReducer';
import { initializeUsers, userCreateBlog } from './reducers/usersReducer';
import { setNotification } from './reducers/notificationReducer';

// react-bootstrap
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const App = () => {

  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  const users = useSelector(state => state.users);
  const user = useSelector(state => state.user);

  // add blog
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatchNotification = (type, content, duration = 3) => {
    dispatch(setNotification(type, content, duration));
  };

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(userReturned());
    dispatch(initializeUsers());
  }, [dispatch]);

  const handleNewBlog = async (newBlog) => {
    if (!newBlog.title || !newBlog.author || !newBlog.url) {
      dispatchNotification('warning', 'Title, Author and URL cannot be blank.');
      return;
    }
    try {
      await dispatch(createBlog(newBlog));
      await dispatch(userCreateBlog(user, newBlog));
      dispatchNotification('success', `A new blog ${newBlog.title} by ${newBlog.author} added.`);
    } catch (exception) {
      dispatchNotification('warning', 'Could not create new blog');
      throw exception;
    }
  };

  const matchUser = useRouteMatch('/users/:id');
  const routedUser = matchUser ? users.find(user => user.id === matchUser.params.id) : null;

  const matchBlog = useRouteMatch('/blogs/:id');
  const routedBlog = matchBlog ? blogs.find(blog => blog.id === matchBlog.params.id) : null;

  if (user === null) {
    return (
      <Container>
        <Notification />
        <Login />
      </Container>
    );
  }

  return (
    <div>
      <Container fluid style={{ padding: 0 }}>
        <Header />
      </Container>
      <Container>
        <Notification />
        <Switch>
          <Route path='/blogs/:id'>
            <Blog blog={routedBlog} user={user} />
          </Route>
          <Route path='/users/:id'>
            <User user={routedUser} />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route exact path='/'>
            <Button variant='outline-primary' onClick={handleShow}>Add Blog</Button>
            <AddBlog createNewBlog={handleNewBlog} handleShow={handleShow} handleClose={handleClose} show={show} />
            <Blogs />
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

export default App;
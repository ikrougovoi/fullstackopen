import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [...state, action.data];
    case 'INIT_BLOGS':
      return action.data;
    case 'LIKE_BLOG': {
      const id = action.data;
      const blogToChange = state.find(blog => blog.id === id);
      const changedBlog = {  ...blogToChange, likes: blogToChange.likes + 1 };
      return state.map(blog => blog.id !== id ? blog : changedBlog );
    }
    case 'REMOVE_BLOG': {
      const id = action.data.id;
      return state.filter(blog => blog.id !== id);
    }
    case 'ADD_COMMENT': {
      return state.map(blog => blog.id !== action.data.updatedBlog.id ? blog : action.data.updatedBlog );
    }
    default:
      return state;
  }
};

export const createBlog = (newBlog) => {
  return async dispatch => {
    const savedBlog = await blogService.create(newBlog);
    dispatch({
      type: 'NEW_BLOG',
      data: savedBlog
    });
  };
};

export const likeBlog = (id) => {
  return async dispatch => {
    await blogService.increaseLikes(id);
    dispatch({
      type: 'LIKE_BLOG',
      data: id
    });
  };
};

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id);
    dispatch({
      type: 'REMOVE_BLOG',
      data: {
        id
      }
    });
  };
};

export const addBlogComment = (id, comment) => {
  return async dispatch => {
    const updatedBlog = await blogService.addComment(id, comment);
    dispatch({
      type: 'ADD_COMMENT',
      data: {
        updatedBlog
      }
    });
  };
};

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    });
  };
};

export default blogReducer;
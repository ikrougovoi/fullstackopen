import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const increaseLikes = async (id) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.put(`${baseUrl}/${id}`, config);
  return response.data;
};

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(`${baseUrl}/${id}/comments`, { text: comment }, config);
  return response.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

export default {
  setToken,
  create,
  increaseLikes,
  deleteBlog,
  addComment,
  getAll
};
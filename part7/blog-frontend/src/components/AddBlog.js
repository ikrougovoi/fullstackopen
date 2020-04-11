import React, { useState } from 'react';

// bootstrap
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddBlog = ({ createNewBlog, handleClose, show }) => {

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

  const handleNewBlog = async () => {
    try {
      await createNewBlog(newBlog);
      setNewBlog(blankNewBlog);
      handleClose();
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='formNewBlogTitle'>
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' placeholder='Title' value={newBlog.title} onChange={ (event) => setNewBlog({ ...newBlog, title: event.target.value }) } />
          </Form.Group>
          <Form.Group controlId='formNewBlogAuthor'>
            <Form.Label>Author</Form.Label>
            <Form.Control type='text' placeholder='Joe Smith' value={newBlog.author} onChange={ (event) => setNewBlog({ ...newBlog, author: event.target.value }) } />
          </Form.Group>
          <Form.Group controlId='formNewBlogAuthor'>
            <Form.Label>URL</Form.Label>
            <Form.Control type='text' placeholder='https://facebook.com' value={newBlog.url} onChange={ (event) => setNewBlog({ ...newBlog, url: event.target.value }) } />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleNewBlog}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBlog;
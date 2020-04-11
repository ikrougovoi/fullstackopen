import React, { useState } from 'react';

// bootstrap
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const BlogComments = ({ comments, addNewComment }) => {

  const [newComment, setNewComment] = useState('');

  const handleNewComment = (event) => {
    event.preventDefault();
    try {
      addNewComment(newComment);
      setNewComment('');
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div>
      <h5>Comments</h5>
      <InputGroup size='sm'>
        <FormControl placeholder='your new comment...' value={newComment} onChange={(event) => setNewComment(event.target.value)}/>
        <InputGroup.Append>
          <Button variant='outline-primary' onClick={handleNewComment}>Add Comment</Button>
        </InputGroup.Append>
      </InputGroup>
      <ListGroup size='sm' style={{ marginTop: 10 }}>
        {comments.map((comment, idx) =>
          <ListGroup.Item key={idx}>
            {comment}
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default BlogComments;
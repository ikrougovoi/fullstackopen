import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

// bootstrap
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Blogs = () => {

  const history = useHistory();

  const blogs = useSelector(state => state.blogs);

  // sort blogs
  const sortedBlogs = blogs.sort((a, b) => {
    return b.likes - a.likes;
  });

  const chunk = (array, size = 1) => {
    let result = [];
    let resIdx = 0;
    for (let i = 0; i < array.length; i += size) {
      result[resIdx++] = array.slice(i, i + size);
    }
    return result;
  };

  const chunkedBlogs = chunk(sortedBlogs, 4);

  return (
    <div>
      {chunkedBlogs.map((row, idx) =>
        <Row key={idx} style={{ marginTop: 10, marginBottom: 10 }}>
          {row.map(col =>
            <Col key={col.id} sm={12} md={3}>
              <Card key={col.id} className='clickable-card' onClick={() => history.push(`/blogs/${col.id}`)}>
                <Card.Body>
                  <Card.Title>{col.title}</Card.Title>
                  <Card.Text>
                    <i className='fas fa-thumbs-up'></i> {col.likes}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default Blogs;
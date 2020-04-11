import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import AddBlog from './AddBlog';

describe('<AddBlog />', () => {

  test('adding a new blog', () => {
    const mockCreateBlog = jest.fn();

    const component = render(
      <AddBlog createBlog={mockCreateBlog} />
    );

    const author = component.container.querySelector('#author');
    const title = component.container.querySelector('#title');
    const url = component.container.querySelector('#url');

    const form = component.container.querySelector('form');

    fireEvent.change(author, { 
      target: { value: 'author via jest' } 
    });
    fireEvent.change(title, {
      target: { value: 'title via jest' }
    });
    fireEvent.change(url, {
      target: { value: 'url via jest' }
    });

    fireEvent.submit(form);

    expect(mockCreateBlog.mock.calls.length).toBe(1);
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('title via jest');
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('author via jest');
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('url via jest');

  }); 

});
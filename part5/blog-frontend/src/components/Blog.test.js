import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';


describe('<Blog />', () => {

  let component;
  const blog = {
    user: '1',
    title: 'testing titles with react-testing-library',
    author: 'igor',
    url: 'http://google.ca',
    likes: 1
  };

  const mockIncreaseLikes = jest.fn();
  const mockDeleteBlog = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog blog={blog} ownedByUser={true} increaseLikes={mockIncreaseLikes} deleteBlog={mockDeleteBlog} />
    );
  });

  test('renders content', () => { 
    const div = component.container.querySelector('blogItem');
    console.log(prettyDOM(div));
  });

  test('at start only renders title and author', () => {
    const div = component.container.querySelector('.toggleableContent')
    expect(div).toHaveStyle('display: none')
  });

  test('when clicking view the url, likes and user are displayed', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    const div = component.container.querySelector('.toggleableContent')
    expect(div).not.toHaveStyle('display: none');
  });

  test('clicking like button twice fires two events', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockIncreaseLikes.mock.calls.length).toBe(2)
  });

});
import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

// queries
import { BOOKS_BY_GENRE } from '../queries';

const Recommended = ({ user, show }) => {

  let genre;

  if(!user) {
    genre = '';
  } else {
    genre = user.favoriteGenre;
  };

  const [getBooks, booksResult] = useLazyQuery(BOOKS_BY_GENRE, {
    variables: {
      genre: genre
    }
  });

  useEffect(() => {
    getBooks();
  }, [getBooks, user])

  if (!show || booksResult.loading) {
    return null
  };

  const books = booksResult.data.allBooks; // result.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favorite genre <b>{genre}</b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Recommended;
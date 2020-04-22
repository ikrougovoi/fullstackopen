import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

// queries
import { ALL_BOOKS } from '../queries';

const Books = ({ show }) => {

  const [genreFilter, setGenreFilter] = useState('');

  const result = useQuery(ALL_BOOKS);

  const filterGenre = genre => {
    setGenreFilter(genre);
  };

  if (!show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  };

  const books = result.data.allBooks;
  const genres = books.map((book) => {
    return book.genres;
  });
  
  const uniqueGenres = [...new Set(genres.flat())];

  const filteredBooks = books.filter((book) => {
    if (!genreFilter) {
      return book;
    };
    return book.genres.includes(genreFilter);
  });

  return (
    <div>
      <h2>books</h2>

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
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      {uniqueGenres.map(genre => 
        <button key={genre} onClick={() => filterGenre(genre)}>{genre}</button>
      )}
      <button onClick={() => setGenreFilter('')}><b>clear</b></button>
    </div>
  )
}

export default Books
import React, { useState, useEffect } from 'react'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client';

// components
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login';
import Recommend from './components/Recommend';

// queries
import { USER_INFO, BOOK_ADDED, ALL_BOOKS, BOOKS_BY_GENRE } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const [getUser, userResult] = useLazyQuery(USER_INFO);

  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
    client.resetStore();
  };

  const updateCacheWith = (addedBook) => {
    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    const updateDataInStore = dataInStore.allBooks.concat(addedBook);
    client.writeQuery({
      query: ALL_BOOKS,
      data: { allBooks: updateDataInStore }
    });
    if (addedBook.genres.includes(user.favoriteGenre)) {
      const dataInRecommendation = client.readQuery({ query: BOOKS_BY_GENRE, variables: { genre: user.favoriteGenre }});
      const updateDataInRecommendation = dataInRecommendation.allBooks.concat(addedBook);
      client.writeQuery({
        query: BOOKS_BY_GENRE,
        variables: { genre: user.favoriteGenre },
        data: { allBooks: updateDataInRecommendation }
      });
    };
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`New Book ${addedBook.title} was added!`);
      updateCacheWith(addedBook);
    }
  });

  useEffect(() =>{
    if(page === 'recommend') {
      console.log('navigating to the recommend page...');
      console.log('running lazy query!');
      getUser();
    }
  }, [page, getUser])

  useEffect(() => {
    console.log('using user result effect..');
    if (userResult.data) {
      console.log('setting user to:', userResult.data);
      setUser(userResult.data.me);
    }
  }, [userResult]);

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token ? 
            <span>
              <button onClick={() => setPage('add')}>add book</button><button onClick={() => setPage('recommend')}>recommend</button><button onClick={logout}>logout</button>
            </span>
            : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend 
        user={user} 
        show={page === 'recommend'} 
      />

      <Login
        setToken={setToken}
        setPage={setPage}
        show={page === 'login'}
      />

    </div>
  )
}

export default App
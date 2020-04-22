import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      id
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const BOOKS_BY_GENRE = gql`
  query findBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      published
    }
  }
`;

export const EDIT_AUTHOR_BIRTH_YEAR = gql`
  mutation editBirthYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
      born
      bookCount
    }
  }
`;

export const LOGIN = gql`
  mutation token($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`;

export const USER_INFO = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`;
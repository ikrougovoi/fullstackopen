const mongoose = require('mongoose');
require('dotenv').config();

const Book = require('./models/book');
const Author = require('./models/author');

mongoose.set('useFindAndModify', false, 'useCreateIndex', true);

const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  });

const authors = [
  {
    name: 'Robert Martin',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
  },
  { 
    name: 'Sandi Metz', // birthyear not known
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

const books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution']
  },
];


const cleanLibrary = async () => {
  await Book.deleteMany({});
  await Author.deleteMany({});
  return 'Cleared Database';
};

const populateAuthors = async () => {
  try {
    const saveAuthorMap = authors.map(async (author) => {
      const newAuthor = new Author({ ...author });
      const savedAuthor = await newAuthor.save();
    });
    const savedAuthors = await Promise.all(saveAuthorMap);
    return savedAuthors.length;
  } catch (err) {
    throw err;
  };
};

const populateBooks = async () => {
  try {
    const saveBookMap = books.map(async (book) => {
      const newBook = new Book({
        title: book.title,
        published: book.published,
        genres: book.genres
      });
      const author = await Author.findOne({ name: book.author });
      newBook.author = author._id;
      const savedBook = await newBook.save();
    });
    const savedBooks = await Promise.all(saveBookMap);
    return savedBooks.length
  } catch (err) {
    throw err;
  }
};

(async () => {
  try {
    const cleanLib = await cleanLibrary();
    console.log(cleanLib);
    const savedAuthors = await populateAuthors();
    console.log(`Saved ${savedAuthors} authors.`);
    const savedBooks = await populateBooks();
    console.log(`Saved ${savedBooks} books.`);
    mongoose.connection.close()
    return;
  } catch (err) {
    console.log(err);
  }
})();


const { ApolloServer, UserInputError, AuthenticationError, gql, PubSub } = require('apollo-server');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const pubsub = new PubSub();
const JWT_SECRET = '123catfish'

const User = require('./models/user');
const Author = require('./models/author');
const Book = require('./models/book');

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

const typeDefs = gql`
  type Book {
    id: ID!,
    title: String!,
    author: Author!,
    published: Int!,
    genres: [String!]!
  }

  type Author {
    id: ID!,
    name: String!
    born: Int,
    bookCount: Int
  }

  type User {
    username: String!,
    favoriteGenre: String!,
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount(author: String): Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]
    ): Book

    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author

    createUser(
      username: String!,
      favoriteGenre: String!
    ): User

    login(
      username: String!,
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({})
          .populate('author');
      };
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author._id, genres: { $in: args.genre } })
          .populate('author');
      };
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author._id })
          .populate('author');
      };
      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } })
          .populate('author');
      };
      return Book.find({})
        .populate('author');
    },
    allAuthors: (root, args) => {
      return Author.find({})
        .populate('bookCount');
    },
    me: (root, args, context) => {
      const currentUser = context.currentUser;

      if(!currentUser) {
        return null;
      };
      
      return context.currentUser;
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let newBook = new Book({ ...args });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      };

      // Looking up author of new book in Author collections
      const author = await Author.findOne({ name: args.author });

      // if author is not in the repository we need to create a new one
      if (!author) {
        const newAuthor = new Author({ name: args.author });

        try {
          const savedAuthor = await newAuthor.save();
          // the new book must be saved with the author's ID
          newBook.author = savedAuthor._id;
          const savedBook = await newBook.save();
          const publishedBook = await Book.findById(savedBook._id).populate('author');
          pubsub.publish('BOOK_ADDED', { bookAdded: publishedBook });
          return savedBook;
        } catch (err) {
          throw new UserInputError(err.message, {
            invalidArgs: args
          });
        };
      };

      // author was found! new book must be saved with the author's ID
      newBook.author = author._id;

      try {
        const savedBook = await newBook.save();
        const publishedBook = await Book.findById(savedBook._id).populate('author');
        pubsub.publish('BOOK_ADDED', { bookAdded: publishedBook });
        return savedBook;
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args
        });
      };
    },
    editAuthor: async (root, args, context) => {
      const authorToUpdate = await Author.findOne({ name: args.name });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      };
      if (!authorToUpdate) {
        return null;
      };

      authorToUpdate.born = args.setBornTo;

      const updatedAuthor = await authorToUpdate.save();

      return updatedAuthor;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('invalid credentials');
      };

      const userForToken = {
        user: user.username,
        id: user._id
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
})
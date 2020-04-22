const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/user');

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


const createUser = async () => {
  const newUser = new User({ username: 'ikroug' });
  const savedUser = await newUser.save();
  return savedUser;
};

(async () => {
  const dbUser = await createUser();
  console.log(dbUser);
})();
const mongoose = require('mongoose');

const User = require('./models/user');

mongoose.set('useFindAndModify', false, 'useCreateIndex', true);

const MONGODB_URI = 'mongodb+srv://fullstackopen-user:ZYf2HqAHoGnlpMo2@cluster-f-xruup.mongodb.net/library-app?retryWrites=true&w=majority';

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
const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const BlogRouter = require('./controllers/blogs');
const UserRouter = require('./controllers/users');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const logger = require('./utils/logger');

logger.info('connecting to ', config .MONGODB_URI);
mongoose.set('useFindAndModify', false);

mongoose.connect(config .MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB: ', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());

app.use(middleware.tokenExtractor);

app.use('/api/blogs', BlogRouter);
app.use('/api/users', UserRouter);

app.use(middleware.errorHandler);

module.exports = app;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const Person = require('./models/person');

app.use(express.static('build'));

app.use(cors());

app.use(bodyParser.json());

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body);
});

app.use(morgan(
  function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req, res)
    ].join(' ');
  })
);

app.get('/info', (req, res, next) => {

  Person.count({})
    .then(personsCount => {
      res.json({ message: `Phonebook has info for ${personsCount} people` });
    })
    .catch(error => next(error));

});

app.get('/api', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.json(persons.map(person => person.toJSON()));
    })
    .catch(error => next(error));
});

app.get('/api/persons/:id', (req, res, next) => {

  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));

});

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({
      error: 'missing name or number!'
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => {
      res.json(savedAndFormattedPerson);
    })
    .catch(error => next(error));

});


app.delete('/api/persons/:id', (req, res, next) => {

  Person.findByIdAndDelete(req.params.id)
    .then(deleted => {
      console.log(deleted);
      res.status(204).end();
    })
    .catch(error => next(error));

});

app.put('/api/persons/:id', (req, res, next) => {

  const body = req.body;

  if (body.number === undefined) {
    return res.status(400).json({
      error: 'missing new number!'
    });
  }

  Person.findByIdAndUpdate(req.params.id, { number: body.number }, { new: true })
    .then(updated => {
      res.json(updated.toJSON());
    })
    .catch(error => next(error));
});


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformmated id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);

};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
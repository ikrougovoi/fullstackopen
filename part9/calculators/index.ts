import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  try {
    if(isNaN(Number(height)) || isNaN(Number(weight))) {
      throw new Error('malformatted parameters');
    } else {
      const result = calculateBmi(Number(height), Number(weight));
      res.json({
        height: height,
        weight: weight,
        bmi: result
      });
    }
  } catch (err) {
    res.json({
      error: err.message
    });
  }
});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  const dailyExercices = req.body.daily_exercises;
  const target = req.body.target;

  try {
    for (let i = 0; i < dailyExercices.length; i++) {
      if (isNaN(Number(dailyExercices[i]))) {
        throw new Error('malformatted parameters');
      }
    }
    if(isNaN(Number(target))) {
      throw new Error('malformatted parameters');
    }
    const result = calculateExercises(dailyExercices, target);
    res.json(result);
  } catch (err) {
    res.json({
      error: err.message
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
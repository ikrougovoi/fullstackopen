interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  ratingDescription: string;
  rating: number;
}

export const parseExcercises = (args: Array<string>) => {
  // if (args.length < 4) throw new Error('Not enough arguments');
  // if (args.length > 4) throw new Error('Too many arguments');

  let target = 0;
  let dailyExercises: Array<number> = [];

  if(!isNaN(Number(args[2]))) {
    target = Number(args[2]);
  } else {
    throw new Error(`Target value ${args[2]} is not a number.`);
  }

  for(let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error(`Value ${args[i]} is not a number`);
    }
    dailyExercises.push(Number(args[i]));
  }

  return {
    dailyExercises: dailyExercises,
    target: target
  };

};

const calculateRating = (average: number, target: number): Rating => {
  if (average / target <= .777) {
    return {
      ratingDescription: 'keep getting out there',
      rating: 1
    };
  } else if (average / target > .777 && average / target <= .999) {
    return {
      ratingDescription: 'not too bad but could be better',
      rating: 2
    };
  } else {
    return {
      ratingDescription: 'wow!',
      rating: 3
    };
  }
};

export const calculateExercises = (dailyExercises: Array<number>, target: number): Result => {
  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter(day => day > 0).length;
  const totalTrainingHours = dailyExercises.reduce((total, day) => total + day);
  const average = totalTrainingHours / periodLength;
  const success = average > target;
  const { ratingDescription, rating } = calculateRating(average, target);

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};

/*
try {
  const { dailyExercises, target } = parseExcercises(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (err) {
  console.log('Error, something bad happened, message: ', err.message);
}
*/
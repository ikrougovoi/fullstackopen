import diagnosis from '../../data/diagnosis';

import { Diagnosis } from '../types';

const getDiagnoses = (): Array<Diagnosis> => {
  return diagnosis;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnoses,
};
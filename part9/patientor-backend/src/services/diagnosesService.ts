import diagnoses from '../../data/diagnoses';

import { Diagnoses } from '../types';

const getDiagnoses = (): Array<Diagnoses> => {
  return diagnoses;
};

const addDiagnoses = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnoses,
};
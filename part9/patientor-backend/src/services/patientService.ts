import patients from '../../data/patients';
import { v1 as uuidv1 } from 'uuid';

import { Patient, NonSensitivePatientInformation, NewPatientEntry } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatientInformation = (): Array<NonSensitivePatientInformation> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuidv1(),
    ...patient
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatientInformation
};
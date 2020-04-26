import patients from '../../data/patients';
import { v1 as uuidv1 } from 'uuid';

import { Patient, NonSensitivePatientInformation, NewPatientEntry, NewEntry } from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatientInformation = (): Array<NonSensitivePatientInformation> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    entries,
    occupation
  }));
};

const getPatient = (patientId: string): Patient | undefined => {
  const returnedPatient = patients.filter((patient) => patient.id === patientId);
  return {
    ...returnedPatient[0]
  };

};

const addPatient = (patient: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuidv1(),
    ...patient
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: NewEntry): Patient => {
  const patientToUpdate = patients.filter((patient) => patient.id === patientId);

  patientToUpdate[0].entries.push({ 
    id: uuidv1(), 
    ...entry 
  });

  return patientToUpdate[0];
};

export default {
  getPatients,
  addPatient,
  getNonSensitivePatientInformation,
  getPatient,
  addEntry
};
import { NewPatientEntry, Gender, NewEntry } from './types';

/* patients
{
  "id": "d2773336-f723-11e9-8f0b-362b9e155667",
  "name": "John McClane",
  "dateOfBirth": "1986-07-09",
  "ssn": "090786-122X",
  "gender": "male",
  "occupation": "New york city cop"
}
*/
/* eslint-disable @typescript-eslint/no-explicit-any */

const isString = (text: any): text is string => { 
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseText = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect or missing text: ' + text);
  }
  return text;
};

const parseDate = (date: any): string => { /* eslint-disable @typescript-eslint/no-explicit-any */
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  } 
  return gender;
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseText(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseText(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseText(object.occupation),
    entries: []
  };
};

export const toNewEntry = (object: any): NewEntry => {

  const commonFields = {
    type: object.type,
    date: parseDate(object.date),
    description: parseText(object.description),
    specialist: parseText(object.specialist),
    diagnosisCodes: object.diagnosisCodes ? object.diagnosisCodes.map((code: any) => parseText(code)) : null
  };

  switch (object.type) {
    case 'Hospital':
      return {
        ...commonFields,
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseText(object.discharge.criteria)
        }
      };
    case 'OccupationalHealthcare':
      return {
        ...commonFields,
        employerName: parseText(object.employerName),
        sickLeave: {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate)
        }
      };
    case 'HealthCheck':
      return {
        ...commonFields,
        healthCheckRating: object.healthCheckRating
      };
    default:
      throw new Error('Incorrect entry:' + object);
  }
};
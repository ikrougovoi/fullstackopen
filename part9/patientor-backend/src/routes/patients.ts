import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientInformation());
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatient = patientService.addPatient({
      ...newPatientEntry
    });
    res.json(addedPatient);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
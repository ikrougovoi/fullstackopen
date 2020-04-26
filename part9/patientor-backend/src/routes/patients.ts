import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientInformation());
});

router.get('/:patientId', (req, res) => {
  const patientId = req.params.patientId;
  res.send(JSON.stringify(patientService.getPatient(patientId)));
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

router.post('/:patientId/entries', (req, res) => {
  const patientId = req.params.patientId;

  try {
    const newEntry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(patientId, { ...newEntry });
    res.json(updatedPatient);
  } catch (err) {
    res.status(400).send(err.message);
  }

});

export default router;
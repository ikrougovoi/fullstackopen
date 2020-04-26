import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updateLocalPatientList, updateLocalPatient } from "../state";

import { Container, Icon, Item, Button } from 'semantic-ui-react';

import EntryDetails from './EntryDetails';
import { EntryFormValues as HospitalEntryFormValues } from "./AddEntryModal/AddHospitalEntry";
import { EntryFormValues as HealthCheckEntryFormValues } from "./AddEntryModal/AddHospitalEntry";
import AddEntryModal from "./AddEntryModal";

type IconOptions = 'mars' | 'venus' | 'venus mars';

type UnitedEntryFormValues = HospitalEntryFormValues | HealthCheckEntryFormValues;

const PatientPage: React.FC = () => {

  const [patient, setPatient] = React.useState<Patient | null>(null);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const [entryType, setEntryType] = React.useState<string>('');

  const [error, setError] = React.useState<string | undefined>();

  const { id } = useParams<{ id: string }>();

  const [{ details }, dispatch] = useStateValue();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    if (id) {
      if (details[id]) {
        // found patient in local state
        setPatient(details[id]);
      }
      // couldn't find patient in local state, going to retrieve from server
      if (!details[id]) {
        const fetchPatient = async () => {
          try {
            const { data: patientFromApi } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch(updateLocalPatientList(patientFromApi));
          } catch (e) {
            console.error(e);
          }
        };
        fetchPatient();
      }
    }
  }, [dispatch, details, id]);

  if (!patient) {
    return null;
  }

  const openModalType = (modalTypeBtn: string) => {
    setEntryType(modalTypeBtn);
    openModal();
  };

  const icon = (gender: string): IconOptions => {
    switch (gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      default:
        return 'venus mars';
    }
  };

  const submitNewEntry = async (values: UnitedEntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(updateLocalPatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <div className="App">
      <Container>
        <h2>{patient.name} <Icon name={ icon(patient.gender) } /></h2>
        ssn: {patient.ssn}<br/>
        occupation: {patient.occupation}<br/>
        <h4>entries</h4>
        <h6>add entry</h6>
        <Button.Group>
          <Button onClick={() => openModalType('healthcheck')}>Health Check</Button>
          <Button onClick={() => openModalType('occupational')}>Occupational Healthcare</Button>
          <Button onClick={() => openModalType('hospital')}>Hospital</Button>
        </Button.Group>
        <AddEntryModal
          modalOpen={modalOpen}
          entryType={entryType}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Item.Group divided>
          {patient.entries.map((entry) =>
            <EntryDetails key={entry.id} entry={entry} />
          )}
        </Item.Group>
      </Container>
    </div>
  );
};

export default PatientPage;

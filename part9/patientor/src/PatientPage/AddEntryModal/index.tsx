import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddHospitalEntry';
import AddHealthCheck from './AddHealthCheckEntry';
import AddOccupationalHealthEntry from './AddOccupationalHealthEntry';
import { NewEntry } from '../../types';

interface Props {
  modalOpen: boolean;
  entryType: string;
  onClose: () => void;
  onSubmit: (values: NewEntry) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, entryType, onClose, onSubmit, error }: Props) => {

  const entryForm = () => {
    if (entryType === 'hospital') {
      return <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />;
    } else if (entryType === 'healthcheck') {
      return <AddHealthCheck onSubmit={onSubmit} onCancel={onClose} />;
    } else {
      return <AddOccupationalHealthEntry onSubmit={onSubmit} onCancel={onClose} />;
    }
  };
  
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new patient</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        {entryForm()}
        
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;

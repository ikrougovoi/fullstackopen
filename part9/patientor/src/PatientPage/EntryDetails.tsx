import React from "react";

import { Entry } from '../types';

import { Item, Icon } from 'semantic-ui-react';

/*
{
  id: 'd811e46d-70b3-4d90-b090-4535c7cf8fb1',
  date: '2015-01-02',
  type: 'Hospital',
  specialist: 'MD House',
  diagnosisCodes: ['S62.5'],
  description:
    "Healing time appr. 2 weeks. patient doesn't remember how he got the injury.",
  discharge: {
    date: '2015-01-16',
    criteria: 'Thumb has healed.',
  },
}
*/
const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Item>
      <Item.Content>
        <Item.Header>{entry.date} <Icon name='hospital' /></Item.Header>
        <Item.Meta>{entry.description}</Item.Meta>
      </Item.Content>
    </Item>
  );
};

/*
{
  id: '37be178f-a432-4ba4-aac2-f86810e36a15',
  date: '2018-10-05',
  specialist: 'MD House',
  type: 'HealthCheck',
  description:
    'Yearly control visit. Due to high cholesterol levels recommended to eat more vegetables.',
  healthCheckRating: 1,
},
*/

const HealthCheck: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Item>
      <Item.Content>
        <Item.Header>{entry.date} <Icon name='user md' /></Item.Header>
        <Item.Meta>{entry.description}</Item.Meta>
      </Item.Content>
    </Item>
  );
};


/*
{
  id: 'fcd59fa6-c4b4-4fec-ac4d-df4fe1f85f62',
  date: '2019-09-10',
  specialist: 'MD House',
  type: 'OccupationalHealthcare',
  employerName: 'FBI',
  description: 'Prescriptions renewed.',
}
*/
const OccupationalHealthcare: React.FC<{ entry: Entry }> = ({ entry }) => {
  const occupationalEntry = entry;
  return (
    <Item>
      <Item.Content>
        <Item.Header>{occupationalEntry.date} <Icon name='medkit' /></Item.Header>
        <Item.Meta>{occupationalEntry.description}</Item.Meta>
      </Item.Content>
    </Item>
  );
};


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

  function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
  }

  if (!entry) {
    return null;
  }

  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    default:
      assertNever(entry);
  }
};

export default EntryDetails;

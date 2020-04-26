import React, { createContext, useContext, useReducer } from "react";
import { Patient, Diagnosis } from "../types";

import { Action } from "./reducer";

export type State = {
  patients: { [id: string]: Patient };
  details: { [id: string]: Patient };
  diagnosis: { [id: string]: Diagnosis };
};

const initialState: State = {
  patients: {},
  details: {},
  diagnosis: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);

export const setPatientList = (patientList: Patient[]): Action => ({
  type: 'SET_PATIENT_LIST',
  payload: patientList
});

export const updateLocalPatientList = (patient: Patient): Action => ({
  type: "RETRIEVE_PATIENT", 
  payload: patient
});

export const updateLocalPatient = (patient: Patient): Action => ({
  type: "UPDATE_PATIENT", 
  payload: patient
});

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => ({
  type: 'SET_DIAGNOSIS_LIST',
  payload: diagnosisList
});
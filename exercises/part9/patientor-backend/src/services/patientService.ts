import { v1 as uuid } from 'uuid';
import patients from '../data/patients';
import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  addPatient,
  getEntries,
  getNonSensitiveEntries,
};

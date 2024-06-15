import patients from '../data/patients';
import { NonSensitivePatientEntry, PatientEntry } from '../types';

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ ssn: _ssn, ...rest }) => rest);
};

export default {
  getEntries,
  getNonSensitiveEntries,
};

import { z } from 'zod';
import { NewPatientEntrySchema } from './utils';

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

type NewPatientEntry = z.infer<typeof NewPatientEntrySchema>;

interface PatientEntry extends NewPatientEntry {
  id: string;
}

type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

export {
  DiagnosisEntry,
  Gender,
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
};

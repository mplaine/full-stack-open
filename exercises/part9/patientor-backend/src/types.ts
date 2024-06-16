interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;

type NewPatientEntry = Omit<PatientEntry, 'id'>;

enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export {
  DiagnosisEntry,
  Gender,
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
};

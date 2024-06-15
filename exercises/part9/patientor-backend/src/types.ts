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

export { DiagnosisEntry, NonSensitivePatientEntry, PatientEntry };

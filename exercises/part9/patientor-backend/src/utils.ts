import { z } from 'zod';
import { Gender, NewPatientEntry } from './types';

const NewPatientEntrySchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  ssn: z.string(),
  gender: z.nativeEnum(Gender),
  occupation: z.string(),
});

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  return NewPatientEntrySchema.parse(object);
};

export { NewPatientEntrySchema, toNewPatientEntry };

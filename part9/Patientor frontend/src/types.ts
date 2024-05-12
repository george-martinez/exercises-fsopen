export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

enum EntryTypes {
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
  HealthCheck = 'HealthCheck'
}

interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<Diagnoses['code']>
}

export enum HealthCheckRating {
'Healthy' = 0,
'LowRisk' = 1,
'HighRisk' = 2,
'CriticalRisk' = 3
}

interface Discharge {
  date: string
  criteria: string
}


interface SickLeaveParam {
  startDate: string
  endDate: string
}

interface HealthCheckEntry extends BaseEntry {
type: EntryTypes.HealthCheck
healthCheckRating: HealthCheckRating
}

interface HospitalEntry extends BaseEntry {
  type: EntryTypes.Hospital
  discharge: Discharge
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryTypes.OccupationalHealthcare
  employerName: string
  sickLeave?: SickLeaveParam
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry| HealthCheckEntry;

export type PatientFormValues = Omit<Patient, "id" | "entries">;
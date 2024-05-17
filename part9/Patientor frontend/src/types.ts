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

export enum EntryTypes {
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
  Healthy = 0,
  LowRisk = 1,
  HighRisk = 2,
  CriticalRisk = 3
}

export interface Discharge {
  date: string
  criteria: string
}


export interface SickLeaveParam {
  startDate: string
  endDate: string
}

export interface HealthCheckEntry extends BaseEntry {
  type: EntryTypes.HealthCheck
  healthCheckRating: HealthCheckRating
}

export interface HospitalEntry extends BaseEntry {
  type: EntryTypes.Hospital
  discharge: Discharge
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryTypes.OccupationalHealthcare
  employerName: string
  sickLeave?: SickLeaveParam
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry| HealthCheckEntry;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;
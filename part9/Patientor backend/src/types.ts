export interface Diagnose {
    code: string
    name: string
    latin?: string
}

export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    gender: string
    occupation: string
    ssn: string
    entries: Entry[]
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
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
    diagnosisCodes?: Array<Diagnose['code']>
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
    employerName: string,
    sickLeave?: SickLeaveParam
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry| HealthCheckEntry;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type PatientWithoutSsn = Omit<Patient, 'ssn'>;

export type newPatientEntry = Omit<Patient, 'id'>;
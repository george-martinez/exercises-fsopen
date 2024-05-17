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

export interface BaseEntry {
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
    employerName: string,
    sickLeave?: SickLeaveParam
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
type UnionPartial<T> = T extends unknown ? Partial<T> : never;
// Define Entry without the 'id' property

//export type EntryWithoutId = UnionOmit<Entry, 'id' | 'discharge' | 'employerName' | 'healthCheckRating'>;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;
export type PartialEntryWithoutId = UnionPartial<Entry>;

export type newBaseEntry = Omit<BaseEntry, 'id'>;

export type Entry = HospitalEntry | OccupationalHealthcareEntry| HealthCheckEntry;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type PatientWithoutSsn = Omit<Patient, 'ssn'>;

export type newPatient = Omit<Patient, 'id'>;
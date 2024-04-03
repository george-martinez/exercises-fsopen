export interface Diagnoses {
    code: string,
    name: string,
    latin?: string
}

export interface Patients {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: string,
    occupation: string,
    ssn: string
}

export type PatientsWithoutSsn = Omit<Patients, 'ssn'>;
import { Table, TableBody } from '@mui/material';
import { Diagnoses, Entry, EntryTypes } from '../../types';
import Hospital from './Hospital';
import HealthCheck from './HealthCheck';
import OccupationalHealthcare from './OccupationalHealthcare';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{ entries: Entry[] | undefined, diagnosesList: Diagnoses[] }> = ({ entries, diagnosesList } ) => { 
    if (!entries || typeof entries !== 'object' ) {
        return <></>;
    }
    
    return (
        <Table>
            <TableBody>
                {entries?.map((patientEntry, index) => {
                    switch (patientEntry.type) {
                        case EntryTypes.Hospital:
                                return (<Hospital key={patientEntry.id} patientEntry={patientEntry} index={index} diagnosesList={diagnosesList}></Hospital>);
                        case EntryTypes.HealthCheck:
                                return (<HealthCheck key={patientEntry.id} patientEntry={patientEntry} index={index} diagnosesList={diagnosesList}></HealthCheck>);
                        case EntryTypes.OccupationalHealthcare:
                                return (<OccupationalHealthcare key={patientEntry.id} patientEntry={patientEntry} index={index} diagnosesList={diagnosesList}></OccupationalHealthcare>);
                        default:
                            assertNever(patientEntry);
                    }
            })}
            </TableBody>
        </Table>
        );
};

export default EntryDetails;

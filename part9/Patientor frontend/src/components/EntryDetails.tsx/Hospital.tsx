import { Diagnoses, HospitalEntry } from "../../types";
import { TableRow, TableCell } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  patientEntry: HospitalEntry
  diagnosesList: Diagnoses[]
  index: number
}

const Hospital = ({ patientEntry, diagnosesList, index }: Props ) => {
    const getDiagnoseDescription = (diagnose: string) => {
        return diagnosesList?.find(d => d.code === diagnose)?.name;
    };
    
    return (
      <>
        <TableRow key={`${patientEntry.id}`} sx={{ marginBottom: '16px' }}>
          <TableCell><LocalHospitalIcon/><b>Entry #{index + 1}:</b></TableCell>
          <TableCell><b>Date: </b>{patientEntry.date}</TableCell>
          <TableCell><b>Description: </b>{patientEntry.description}</TableCell>
          <TableCell><b>Diagnoses:</b>
            <ul>
                {patientEntry?.diagnosisCodes?.map(diagnose => <li key={`${diagnose}`}>{diagnose} {getDiagnoseDescription(diagnose)}</li>)}
            </ul>
          </TableCell>
          <TableCell><b>Discharge: </b>{`${patientEntry.discharge.date} / ${patientEntry.discharge.criteria}`}</TableCell>
          <TableCell><b>Diagnose by: </b>{patientEntry.specialist}</TableCell>
        </TableRow>
      </>
    );
};

export default Hospital;

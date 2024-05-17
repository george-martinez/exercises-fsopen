import { Diagnoses, OccupationalHealthcareEntry } from "../../types";
import { TableRow, TableCell } from "@mui/material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
interface Props {
  patientEntry: OccupationalHealthcareEntry
  diagnosesList: Diagnoses[]
  index: number
}

const OccupationalHealthcare = ({ patientEntry, diagnosesList, index }: Props ) => {
    const getDiagnoseDescription = (diagnose: string) => {
        return diagnosesList?.find(d => d.code === diagnose)?.name;
    };
    
    return (
      <>
      <TableRow key={`${patientEntry.id}`} sx={{ marginBottom: '16px' }}>
        <TableCell><MedicalServicesIcon/><b>Entry #{index + 1}:</b></TableCell>      
        <TableCell><b>Date: </b>{patientEntry.date}</TableCell>      
        <TableCell><b>Description: </b>{patientEntry.description}</TableCell>      
        <TableCell><b>Diagnoses:</b>
        <ul>
            {patientEntry?.diagnosisCodes?.map(diagnose => <li key={`${diagnose}`}>{diagnose} {getDiagnoseDescription(diagnose)}</li>)}
        </ul>
        </TableCell>
        {patientEntry?.sickLeave &&
          <TableCell><b>Sickleave: </b>{`${patientEntry.sickLeave?.startDate}${patientEntry.sickLeave?.endDate}`}</TableCell>
        }
        <TableCell><b>Diagnose by: </b>{patientEntry.specialist}</TableCell>
      </TableRow>
      </>
    );
};

export default OccupationalHealthcare;

import { Diagnoses, HealthCheckEntry, HealthCheckRating } from "../../types";
import { TableRow, TableCell } from "@mui/material";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

interface Props {
  patientEntry: HealthCheckEntry
  diagnosesList: Diagnoses[]
  index: number
}

const HealthCheck = ({ patientEntry, diagnosesList, index }: Props ) => {
    const getDiagnoseDescription = (diagnose: string) => {
        return diagnosesList?.find(d => d.code === diagnose)?.name;
      };
      
    return (
      <>
        <TableRow key={`${patientEntry.id}`} sx={{ marginBottom: '16px' }}>
          <TableCell><HealthAndSafetyIcon/><b>Entry #{index + 1}:</b></TableCell>      
          <TableCell><b>Date: </b>{patientEntry.date}</TableCell>      
          <TableCell><b>Description: </b>{patientEntry.description}</TableCell>      
          <TableCell><b>Diagnoses:</b>
            <ul>
                {patientEntry?.diagnosisCodes?.map(diagnose => <li key={`${diagnose}`}>{diagnose} {getDiagnoseDescription(diagnose)}</li>)}
            </ul>
          </TableCell>
          <TableCell><b>Healthcheck: </b>{Object.values(HealthCheckRating)[patientEntry.healthCheckRating]}</TableCell>      
          <TableCell><b>Diagnose by: </b>{patientEntry.specialist}</TableCell>
        </TableRow>
      </>
    );
};

export default HealthCheck;

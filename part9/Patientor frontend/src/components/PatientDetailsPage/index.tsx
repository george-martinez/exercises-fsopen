import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Diagnoses } from "../../types";
import { Box, Typography, TableCell, TableRow, Table, TableBody } from '@mui/material';


import patientService from '../../services/patients';
import EntryDetails from '../EntryDetails.tsx';

const PatientDetailsPage = ({ diagnosesList }: {diagnosesList: Diagnoses[]}) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();

  if(!id) {
    throw Error("Missing required parameter: id");
  }

  useEffect(() => {
    const getPatient = async () => {
      const fetchedPatient = await patientService.getPatient(id);
      
      void setPatient(fetchedPatient);
    };

    void getPatient();
  }, [id]);

  return (
    <div>
      <Box>
        <Typography variant="h6">Patient Details</Typography>
      </Box>
      <Table style={{ marginBottom: "1em" }}>
        <TableBody>
          <TableRow>
            <TableCell><strong>Name:</strong></TableCell>
            <TableCell>{patient?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Gender:</strong></TableCell>
            <TableCell>{patient?.gender}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>SSN:</strong></TableCell>
            <TableCell>{patient?.ssn}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><strong>Occupation:</strong></TableCell>
            <TableCell>{patient?.occupation}</TableCell>      
          </TableRow>
          </TableBody>
      </Table>
      <Box>
        <Typography variant="h6" margin={'15px'}>Entries:</Typography>
      </Box>
      
      <EntryDetails entries={patient?.entries} diagnosesList={diagnosesList}></EntryDetails>;
    </div>
  );
};

export default PatientDetailsPage;
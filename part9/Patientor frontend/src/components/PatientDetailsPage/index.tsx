import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient } from "../../types";
import { Box, Typography, TableCell, TableRow, Table, TableBody } from '@mui/material';


import patientService from '../../services/patients';

const PatientDetailsPage = () => {
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
            <TableCell>Name</TableCell>
            <TableCell>{patient?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Gender</TableCell>
            <TableCell>{patient?.gender}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>SSN</TableCell>
            <TableCell>{patient?.ssn}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Occupation</TableCell>
            <TableCell>{patient?.occupation}</TableCell>      
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientDetailsPage;
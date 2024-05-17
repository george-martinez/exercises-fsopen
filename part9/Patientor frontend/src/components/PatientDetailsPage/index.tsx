import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Diagnoses, EntryWithoutId } from "../../types";
import { Box, Typography, TableCell, TableRow, Table, TableBody, Button } from '@mui/material';


import patientService from '../../services/patients';
import EntryDetails from '../EntryDetails.tsx';
import AddEntryModal from '../AddEntryModal/index.tsx';
import axios from 'axios';

const PatientDetailsPage = ({ diagnosesList }: {diagnosesList: Diagnoses[]}) => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

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


  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    try {
      const addedEntry = await patientService.addEntry(id, values);
      if(patient?.entries && 'entries' in patient){
        setPatient({
          ...patient,
          entries: [...patient.entries, addedEntry]
        });
      }
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <Box>
        <Typography variant="h6">Patient Details</Typography>
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
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
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      
      <EntryDetails entries={patient?.entries} diagnosesList={diagnosesList}></EntryDetails>;
    </div>
  );
};

export default PatientDetailsPage;
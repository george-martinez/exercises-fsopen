import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnoses, Patient } from "./types";

import patientService from "./services/patients";
import diagnoseService from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import PatientDetailsPage from "./components/PatientDetailsPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosesList, setDiagnosesList] = useState<Diagnoses[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const fetchedPatients = await patientService.getAll();
      setPatients(fetchedPatients);

      const fetchedDiagnoses = await diagnoseService.getAll();
      setDiagnosesList(fetchedDiagnoses);
    };
    void fetchPatientList();
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/patients/:id" element={<PatientDetailsPage diagnosesList={diagnosesList} />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;

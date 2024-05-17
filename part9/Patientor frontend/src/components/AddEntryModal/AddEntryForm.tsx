import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { EntryWithoutId, Diagnoses, EntryTypes } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

interface TypeOption{
    value: EntryTypes;
    label: string;
  }

const handleAddDiagnosisCode = (newCode: string): Array<Diagnoses['code']> => {
  const codes = newCode.trim().split(',');

  return codes;
};

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  //const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnoses['code']>>([]);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');
  const [type, setType] = useState<EntryTypes>();
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [employerName, setEmployerName] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseEntry = {
        description,
        date,
        specialist,
        diagnosisCodes: handleAddDiagnosisCode(diagnosisCodes),
    };
    
    switch(type) {
        case EntryTypes.Hospital: 
            onSubmit({
                ...baseEntry,
                type,
                discharge: {
                  date: dischargeDate,
                  criteria: dischargeCriteria
                }
            });
            break;
         
        case EntryTypes.HealthCheck:
            onSubmit({
                ...baseEntry,
                type,
                healthCheckRating: healthCheckRating
            });
            break;

        case EntryTypes.OccupationalHealthcare:
            onSubmit({
                ...baseEntry,
                type,
                employerName: employerName,
                sickLeave: {
                  startDate: sickLeaveStartDate,
                  endDate: sickLeaveEndDate
                }
            });

            break;
            }
    };

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const entryType = Object.values(EntryTypes).find(e => e.toString() === value);
      if (entryType) {
        setType(entryType);
      }
    }
  };

  const typeOptions: TypeOption[] = Object.values(EntryTypes).map(v => ({
    value: v, label: v.toString()
  }));

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Diagnose codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />

        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select
          label="Type"
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
        {typeOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label
          }</MenuItem>
        )}
        </Select>

        {
            type === EntryTypes.OccupationalHealthcare &&
                <>
                    <TextField
                        label="Employer name"
                        placeholder="YYYY-MM-DD"
                        fullWidth
                        value={employerName}
                        onChange={({ target }) => setEmployerName(target.value)}
                    />
                    <TextField
                        label="Sick Leave Start Date"
                        placeholder="YYYY-MM-DD"
                        fullWidth
                        value={sickLeaveStartDate}
                        onChange={({ target }) => setSickLeaveStartDate(target.value)}
                    />
                        <TextField
                            label="Sick Leave End Date"
                            placeholder="YYYY-MM-DD"
                            fullWidth
                            value={sickLeaveEndDate}
                            onChange={({ target }) => setSickLeaveEndDate(target.value)}
                        />
                </>
        }
        {
            type === EntryTypes.HealthCheck &&
                <>
                    <TextField
                        label="HealthCheckRating"
                        fullWidth
                        value={healthCheckRating}
                        onChange={({ target }) => setHealthCheckRating(Number(target.value))}
                    />

                </>
        }
        {
            type === EntryTypes.Hospital &&
                <>
                    <TextField
                        label="Discharge date"
                        placeholder="YYYY-MM-DD"
                        fullWidth
                        value={dischargeDate}
                        onChange={({ target }) => setDischargeDate(target.value)}
                    />
                        <TextField
                            label="Discharge Criteria"
                            fullWidth
                            value={dischargeCriteria}
                            onChange={({ target }) => setDischargeCriteria(target.value)}
                        />
                </>
        }
        

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
              disabled={!description || !date || !specialist || !diagnosisCodes || !type}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { EntryWithoutId, Diagnoses, EntryTypes, HealthCheckRating } from "../../types";
import DiagnoseCodesSelect from "./DiagnoseCodesSelect";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
}

interface TypeOption {
    value: EntryTypes;
    label: string;
}

interface HealthCheckRatingOption {
  value: HealthCheckRating,
  label: string
}


const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnoses['code']>>([]);
  //const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');
  const [type, setType] = useState<EntryTypes | string>('');
  const [dischargeDate, setDischargeDate] = useState<string>('');
  const [dischargeCriteria, setDischargeCriteria] = useState<string>('');
  const [employerName, setEmployerName] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<string>('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseEntry = {
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes,
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
                healthCheckRating: Number(healthCheckRating)
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

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "number") {
      const value = event.target.value;
      const entryHealthCheckRating: string | undefined = Object.values(HealthCheckRating).find(e => Number(e) === value)?.toString();
      
      if (entryHealthCheckRating) {
        setHealthCheckRating(entryHealthCheckRating);
      }
    }
  };

  const typeOptions: TypeOption[] = Object.values(EntryTypes).map(v => ({
    value: v, label: v.toString()
  }));

  const healthCheckEntryOptions: HealthCheckRatingOption[] = Object.keys(HealthCheckRating)
  .filter(key => isNaN(Number(key)))
  .map(key => ({
    value: HealthCheckRating[key as keyof typeof HealthCheckRating],
    label: key
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
        <InputLabel>Date</InputLabel>
        <TextField
          type="date"
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

        <DiagnoseCodesSelect diagnoses={diagnosisCodes} setDiagnoses={setDiagnosisCodes}/>

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
                    <InputLabel>Sick Leave</InputLabel>
                    <InputLabel sx={{marginLeft: '30px', width: 'calc(100% - 30px)'}}>Start date</InputLabel>
                    <TextField
                        type="date"
                        fullWidth
                        value={sickLeaveStartDate}
                        sx={{marginLeft: '30px', width: 'calc(100% - 30px)'}}
                        onChange={({ target }) => setSickLeaveStartDate(target.value)}
                    />
                    <InputLabel sx={{marginLeft: '30px', width: 'calc(100% - 30px)'}}>End date</InputLabel>
                    <TextField
                    type="date"
                        fullWidth
                        value={sickLeaveEndDate}
                        sx={{marginLeft: '30px', width: 'calc(100% - 30px)'}}
                        onChange={({ target }) => setSickLeaveEndDate(target.value)}
                    />
                </>
        }
        {
            type === EntryTypes.HealthCheck &&
                <>
                    <InputLabel style={{ marginTop: 10 }}>HealthCheckRating</InputLabel>
                    <Select
                      label="HealthCheckRating"
                      fullWidth
                      value={healthCheckRating}
                      onChange={onHealthCheckRatingChange}
                    >
                    {healthCheckEntryOptions.map(option =>
                      <MenuItem
                        key={option.label}
                        value={option.value}
                      >
                        {option.label
                      }</MenuItem>
                    )}
                    </Select>
                </>
        }
        {
            type === EntryTypes.Hospital &&
                <>
                    <InputLabel>Discharge</InputLabel>
                    <InputLabel sx={{marginLeft: '30px', width: 'calc(100% - 30px)'}}>Date</InputLabel>
                    <TextField
                        type="date"
                        value={dischargeDate}
                        sx={{marginLeft: '30px', width: 'calc(100% - 30px)'}}
                        onChange={({ target }) => setDischargeDate(target.value)}
                    />
                    <TextField
                        label="Criteria"
                        fullWidth
                        value={dischargeCriteria}
                        sx={{marginLeft: '30px', width: 'calc(100% - 30px)'}}
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
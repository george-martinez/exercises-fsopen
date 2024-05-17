import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import diagnosesService from '../../services/diagnoses';
import { Diagnoses } from '../../types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(code: string, diagnoses: string[], theme: Theme) {
  return {
    fontWeight:
    diagnoses.indexOf(code) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  diagnoses: Array<Diagnoses['code']>,
  setDiagnoses: React.Dispatch<React.SetStateAction<Array<Diagnoses['code']>>>
}

export default function DiagnoseCodesSelect({ diagnoses, setDiagnoses }: Props) {
  const theme = useTheme();
  const [allDiagnoses, setAllDiagnoses] = React.useState<string[]>([]);
  
  React.useEffect(() => {
    const getDiagnoses = async () => {
      const fetchedDiagnose = await diagnosesService.getAll();

      const diagnoseCodeArr = fetchedDiagnose.map(d => d.code);
      
      void setAllDiagnoses(diagnoseCodeArr);
    };

    void getDiagnoses();
  }, [setDiagnoses]);

  const handleChange = (event: SelectChangeEvent<typeof diagnoses>) => {
    const {
      target: { value },
    } = event;
    setDiagnoses(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ marginTop: 1, width: 300 }}>
        <InputLabel>Diagnosis codes</InputLabel>
        <Select
          multiple
          value={diagnoses}
          onChange={handleChange}
          input={<OutlinedInput label="Diagnosis Codes" />}
          MenuProps={MenuProps}
        >
          {allDiagnoses.map((code) => (
            <MenuItem
              key={code}
              value={code}
              style={getStyles(code, diagnoses, theme)}
            >
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

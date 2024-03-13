import * as React from 'react';
import Welcome from "./components/Header"
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function App() {
    const [type, setType] = React.useState('');

    const handleChange = (event) => {
      setType(event.target.value);
    };

    return (
        <>
        <Welcome />
        <TextField id="row-name-text" label="Row Name" variant="outlined" />

        <FormControl sx={{minWidth: 150}}>
            <InputLabel id="select-type-label">Type</InputLabel>
            <Select
            labelId="select-row"
            id="demo-simple-select-autowidth"
            value={type}
            onChange={handleChange}
            autoWidth
            label="type"
            >
            <MenuItem value={1}>Type 1</MenuItem>
            <MenuItem value={2}>Type 2</MenuItem>
            <MenuItem value={3}>Type 3</MenuItem>
            </Select>
        </FormControl>
        </>
    )
}

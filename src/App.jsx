import * as React from 'react';
import Welcome from "./components/Header"
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function App() {
    const [type, setType] = React.useState('');

    const handleChange = (event) => {
      setType(event.target.value);
    };

    return (
        <>
        <Welcome />
        {/* Row Name */}
        <TextField id="row-name-text" label="Row Name" variant="outlined" />

        <p></p>
        {/* Dropdown Type Selector */}
        <FormControl sx={{minWidth: 150}}>
            <InputLabel id="select-type-label">Type</InputLabel>
            <Select
            labelId="select-type-label"
            id="select-input-type"
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

        <p></p>
        {/* Number Input */}
        <TextField id="min-num-text" label="Min Number" inputProps={{ type: 'number'}} />
        <TextField id="max-num-text" label="Max Number" inputProps={{ type: 'number'}} />
        <TextField id="num-decimals-text" label="Number of Decimals" inputProps={{ type: 'number'}} />


        <p></p>
        {/* String (Not processed for list yet) Input */}
        <TextField id="string-input-text" label="List Input" variant="outlined" />

        <p></p>
        {/* Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Start Date"/>
            <DatePicker label="End Date"/>
        </LocalizationProvider>

        <p></p>
        {/* Time Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker label="Start Time" />
            <TimePicker label="End Time" />
        </LocalizationProvider>
        
        <p></p>
        {/* Percentage of Blanks Input */}
        <TextField id="percent-blank-text" label="Percentage of Blanks" InputProps={{ type: 'number',
            endAdornment: '%'}} />
        </>
    )
}

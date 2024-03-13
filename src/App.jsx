import * as React from 'react';
import Welcome from './components/Header'
import { basicInputTypes } from './inputType';

import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import AddCircleIcon from '@mui/icons-material/AddCircle';


export default function App() {
    const [type, setType] = React.useState("");
    const [rows, setRows] = React.useState([{ name: '', type: '', blanks: '' }]);

    const handleChange = (event) => {
        const chosenValue = event.target.value;
        setType(chosenValue);
    };

    const handleAddRow = () => {
        setRows(prevRows => [...prevRows, { name: '', type: '', blanks: '' }]);
    };

    // Define a function to render input fields based on options
    const renderInputFields = (selectedInputTypeInfo) => {
        if (!selectedInputTypeInfo || !selectedInputTypeInfo.options || selectedInputTypeInfo.options.length === 0) {
            return null;
        }
    
        // Render input fields based on options
        return selectedInputTypeInfo.options.map(option => {
            switch (option) {
                case 'address-line-text':
                    return <TextField key={option} id="address-line-text" label="Address Line" variant="outlined" />;
                case 'min-num-text':
                    return <TextField key={option} id="min-num-text" label="Min Number" inputProps={{ type: 'number'}} />;
                case 'max-num-text':
                    return <TextField key={option} id="max-num-text" label="Max Number" inputProps={{ type: 'number'}} />;
                default:
                    return null;
            }
        });
    };

    return (
        <>
            <Welcome/>
            {rows.map((row, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    {/* Row Name */}
                    <TextField
                        value={row.name}
                        onChange={(e) => {
                            const newName = e.target.value;
                            setRows(prevRows => prevRows.map((r, idx) => idx === index ? { ...r, name: newName } : r));
                        }}
                        label="Row Name"
                        variant="outlined"
                    />

                    {/* Dropdown Type Selector */}
                    <FormControl sx={{minWidth: 150}}>
                        <InputLabel id={`select-type-label-${index}`}>Type</InputLabel>
                        <Select
                            labelId={`select-type-label-${index}`}
                            value={row.type}
                            onChange={(e) => {
                                const newType = e.target.value;
                                setRows(prevRows => prevRows.map((r, idx) => idx === index ? { ...r, type: newType } : r));
                            }}
                            autoWidth
                            label="type"
                        >
                            {basicInputTypes.map((type, idx) => (
                                <MenuItem key={idx} value={type.name}>{type.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    {/* Percentage of Blanks Input */}
                    <TextField
                        value={row.blanks}
                        onChange={(e) => {
                            const newBlanks = e.target.value;
                            setRows(prevRows => prevRows.map((r, idx) => idx === index ? { ...r, blanks: newBlanks } : r));
                        }}
                        label="Percentage of Blanks"
                        InputProps={{ type: 'number', endAdornment: '%' }}
                    />

                    {renderInputFields(basicInputTypes.find(inputType => inputType.name === row.type))}

                    {index === rows.length - 1 && (
                        <AddCircleIcon onClick={handleAddRow} style={{ marginLeft: 'auto', cursor: 'pointer' }} />
                    )}
                </div>
            ))}
        </>
    );
}
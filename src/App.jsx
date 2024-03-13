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
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

export default function App() {
    const [type, setType] = React.useState("");
    const [rows, setRows] = React.useState([{ name: '', type: '', blanks: '' }]);
    const [format, setFormat] = React.useState('JSON');

    const handleChange = (event) => {
        const chosenValue = event.target.value;
        setType(chosenValue);
    };

    const handleAddRow = () => {
        setRows(prevRows => [...prevRows, { name: '', type: '', blanks: '' }]);
    };

    const handleFormatChange = (event) => {
        setFormat(event.target.value);
    };

    // Define a function to render input fields based on options
    const renderInputFields = (selectedInputTypeInfo) => {
        if (!selectedInputTypeInfo || !selectedInputTypeInfo.options || selectedInputTypeInfo.options.length === 0) {
            return null;
        }
    
        // Render input fields based on options
        return (
            <div style={{ display: 'flex' }}>
                {selectedInputTypeInfo.options.map(option => {
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
                })}
            </div>
        );
    };

    return (
        <>
            <Welcome/>
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
                <div style={{ minWidth: 200, flex: 1, marginLeft: '10px' }}>Row Name</div>
                <div style={{ minWidth: 200, flex: 1, marginLeft: '10px' }}>Input Type</div>
                <div style={{ minWidth: 100, flex: 1, marginLeft: '10px' }}>Blanks</div>
                <div style={{ minWidth: 200, flex: 1, marginLeft: '10px' }}>Other Options</div>
            </div>
            {rows.map((row, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    {/* Row Name */}
                    <TextField
                        sx={{minWidth: 200, flex: 1, marginLeft: '10px' }}
                        value={row.name}
                        onChange={(e) => {
                            const newName = e.target.value;
                            setRows(prevRows => prevRows.map((r, idx) => idx === index ? { ...r, name: newName } : r));
                        }}
                        label=""
                        variant="outlined"
                        style={{ flex: 1 }}
                    />

                    {/* Dropdown Type Selector */}
                    <FormControl sx={{minWidth: 200, flex: 1, marginLeft: '10px' }}>
                        <InputLabel id={`select-type-label-${index}`}></InputLabel>
                        <Select
                            labelId={`select-type-label-${index}`}
                            value={row.type}
                            onChange={(e) => {
                                const newType = e.target.value;
                                setRows(prevRows => prevRows.map((r, idx) => idx === index ? { ...r, type: newType } : r));
                            }}
                            autoWidth
                            label=""
                        >
                            {basicInputTypes.map((type, idx) => (
                                <MenuItem key={idx} value={type.name}>{type.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    
                    {/* Percentage of Blanks Input */}
                    <TextField
                        sx={{minWidth: 100, flex: 1, marginLeft: '10px' }}
                        value={row.blanks}
                        onChange={(e) => {
                            const newBlanks = e.target.value;
                            setRows(prevRows => prevRows.map((r, idx) => idx === index ? { ...r, blanks: newBlanks } : r));
                        }}
                        label=""
                        InputProps={{
                            type: 'number',
                            endAdornment: '%',
                            inputProps: { min: 0, max: 100 }
                        }}
                        style={{ flex: 1 }}
                        placeholder="0"
                    />

                    {/* Other Options */}
                    <div style={{ minWidth: 200, flex: 1, marginLeft: '10px' }}>
                        {renderInputFields(basicInputTypes.find(inputType => inputType.name === row.type))}
                    </div>
                </div>
            ))}

            <AddCircleIcon onClick={handleAddRow} style={{ marginLeft: 'auto', cursor: 'pointer' }} />


            {/* Generate Data Button with Format Dropdown Picker */}
            <Divider style={{ margin: '20px 0' }} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                    Generate Data
                </Button>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <InputLabel style={{ marginRight: '10px' }}>Format:</InputLabel>
                    <Select
                        value={format}
                        onChange={handleFormatChange}
                        label="Format"
                    >
                        <MenuItem value="JSON">JSON</MenuItem>
                        <MenuItem value="SQL">SQL</MenuItem>
                    </Select>
                </div>
            </div>
        </>
    );
}

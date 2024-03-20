import * as React from 'react';

import Header from './components/Header';
import { basicInputTypes } from './inputType';
import { customListTypes } from './customListType';
import { datetimeFormatListTypes } from './datetimeFormatListTypes';
import { timeFormatListTypes } from './timeFormatListTypes';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AddCircleIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import * as generator from './generator';

export default function App() {
    const [rows, setRows] = React.useState([{ name: 'row_number_0', type: 'Row Number', blanks: '50' }]);
    const [numberOfRowsInOutput, setNumberOfRowsInOutput] = React.useState(1000);
    const [format, setFormat] = React.useState('CSV');
    const [customListValue, setCustomListValue] = React.useState('random');

    const [datetimeFormatListValue, setDatetimeFormatListValue] = React.useState('DD/MM/YYYY');
    const [timeFormatListValue, setTimeFormatListValue] = React.useState('h:mm A');

    // State hooks for start and end dates
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    // State hooks for start and end time
    const [startTime, setStartTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);

    const handleAddRow = () => {
        console.log('Adding a new row');
        const newRow = {
            name: `row_number_${rows.length}`,
            type: 'Row Number',
            blanks: '50'
        };
        setRows(prevRows => [...prevRows, newRow]);
    };


    const handleDeleteRow = (indexToDelete) => {
        setRows(prevRows => prevRows.filter((row, index) => index !== indexToDelete));
    };

    const handleFormatChange = (event) => {
        setFormat(event.target.value);
    };

    const handleCustomListChange = (event) => {
        setCustomListValue(event.target.value);
    };

    const handleDatetimeFormatListChange = (event) => {
        setDatetimeFormatListValue(event.target.value);
    };

    const handleTimeFormatListChange = (event) => {
        setTimeFormatListValue(event.target.value);
    };


    const handleDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(rows);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setRows(items);
    };
    // CSV Functions
    const convertRowsToCSV = () => {
        let csvContent = "data:text/csv;charset=utf-8,";

        // Extract field names, types, and blanks percentages
        const headers = rows.map(row => row.name);
        const types = rows.map(row => row.type);
        const blanksPercentages = rows.map(row => row.blanks);

        // Append headers
        csvContent += headers.join(',') + '\r\n';

        // Generate sequence if needed
        const startAt = parseInt(document.getElementById(`start-at-text`)?.value) || 1;
        const step = parseInt(document.getElementById(`step-text`)?.value) || 1;
        const repeat = parseInt(document.getElementById(`repeat-text`)?.value) || 1;
        const restartAt = parseInt(document.getElementById(`restart-at-text`)?.value);
        let sequence = [];

        if (types.includes("Sequence")) {
            sequence = generator.generateSequence(startAt, step, repeat, restartAt, numberOfRowsInOutput);
        }

        
        // Repeat types based on numberOfRowsInOutput
        for (let i = 0; i < numberOfRowsInOutput; i++) {
            const rowData = types.map((type, index) => {
                if (type === 'Row Number') {
                    // If type is row number, print the row number
                    return i + 1;
                } else if (type === 'Address Line') {
                    // If type is Address Line, generate a random address
                    return generator.generateRandomAddress();
                } else if (type === 'Boolean') {
                    // If type is Boolean, generate a random boolean value (true or false)
                    return Math.random() < 0.5 ? 'true' : 'false';
                } else if (type === 'Colour') {
                    // If type is Address Line, generate a random color
                    return generator.generateRandomColorName();
                } else if (type === 'Blank') {
                    return ``;
                } else if (type === 'Datetime') {
                    return generator.generateRandomDatetime(startDate, endDate, datetimeFormatListValue);
                } else if (type === 'Frequency') {
                    return generator.generateRandomFrequency();
                } else if (type === 'GUID') {
                    return generator.generateRandomGUID();
                } else if (type === 'Hex Colour') {
                    return '#' + generator.generateRandomHexColor();
                } else if (type === 'ISBN') {
                    return generator.generateRandomISBN();
                } else if (type === 'MongoDB ObjectID') {
                    return generator.generateRandomMongoDBObjectId();
                } else if (type === 'Nato Phonetic') {
                    const min = parseFloat(document.getElementById(`at-least-text`).value) || 3;
                    const max = parseFloat(document.getElementById(`at-most-text`).value) || 10;
                    return generator.generateRandomNatoPhonetics(min, max);
                } else if (type === 'Number') {
                    // If type is Number, generate a random number within the specified range
                    const min = parseFloat(document.getElementById(`min-num-text`).value) || 0;
                    const max = parseFloat(document.getElementById(`max-num-text`).value) || 100;
                    const decimals = parseInt(document.getElementById(`decimals-text`).value) || 0;
                    return generator.generateRandomNumber(min, max, decimals);
                } else if (type === 'Password') {
                    // If type is Password, generate a random password
                    const minLength = parseInt(document.getElementById(`password-options-min-length`).value) || 8;
                    const minUpper = parseInt(document.getElementById(`password-options-upper`).value) || 1;
                    const minLower = parseInt(document.getElementById(`password-options-lower`).value) || 1;
                    const minNumber = parseInt(document.getElementById(`password-options-number`).value) || 1;
                    const minSymbol = parseInt(document.getElementById(`password-options-symbol`).value) || 1;
                    return generator.generateRandomPassword(minLength, minUpper, minLower, minNumber, minSymbol);
                } else if (type === 'Password Hash') {
                    return generator.generateRandomPasswordHash();
                } else if (type === 'Paragraphs') {
                    // If type is Paragraph, generate a random paragraph
                    const min = parseInt(document.getElementById(`at-least-text`).value) || 1;
                    const max = parseInt(document.getElementById(`at-most-text`).value) || 10;
                    return generator.generateRandomParagraphs(min, max);
                } else if (type === 'Short Hex Colour') {
                    return generator.generateRandomShortHexColor();
                } else if (type === 'Sentences') {
                    const min = parseInt(document.getElementById(`at-least-text`).value) || 1;
                    const max = parseInt(document.getElementById(`at-most-text`).value) || 10;
                    return generator.generateRandomSentences(min, max);
                } else if (type === 'Sequence') {
                    return sequence[i];
                } else if (type === 'Time') {
                    return generator.generateRandomTime(startTime, endTime, timeFormatListValue);
                } else if (type === 'ULID') {
                    return generator.generateRandomULID();
                } else if (type === 'Words') {
                    // If type is Words, generate random words
                    const min = parseInt(document.getElementById(`at-least-text`).value) || 1;
                    const max = parseInt(document.getElementById(`at-most-text`).value) || 10;
                    return generator.generateRandomWords(min, max);
                } else {
                    // Handle other types as needed
                    return ``;
                }
            });
            csvContent += rowData.join(',') + '\r\n';
        }

        // Encode CSV content
        const encodedUri = encodeURI(csvContent);
        return encodedUri;
    };

    // Function to handle CSV download
    const handleDownloadCSV = () => {
        const csvContent = convertRowsToCSV();
        const link = document.createElement("a");
        link.setAttribute("href", csvContent);
        link.setAttribute("download", "data.csv");
        document.body.appendChild(link);
        link.click();
    };

    // Define a function to render input fields based on options
    const renderInputFields = (selectedInputTypeInfo) => {
        if (!selectedInputTypeInfo || !selectedInputTypeInfo.options || selectedInputTypeInfo.options.length === 0) {
            return null;
        }

        // Render input fields based on options
        return (
            <div style={{ minWidth: 600, display: 'flex' }}>
                {selectedInputTypeInfo.options.map(option => {
                    switch (option) {
                        case 'min-num-text':
                            return <TextField key={option} id={option} label="Min Number" inputProps={{ type: 'number' }} sx={{ marginRight: '10px' }} defaultValue={0} />;
                        case 'max-num-text':
                            return <TextField key={option} id={option} label="Max Number" inputProps={{ type: 'number' }} sx={{ marginRight: '10px' }} defaultValue={100} />;
                        case 'success-probability-text':
                            return <TextField key={option} id={option} label="Success Probability" inputProps={{ type: 'number' }} sx={{ maxWidth: 200, marginRight: '10px' }} />;
                        case 'custom-list-dropdown':
                            return (
                                <FormControl key={option} sx={{ minWidth: 120 }}>
                                    <InputLabel id={option}></InputLabel>
                                    <Select
                                        labelId={option}
                                        value={customListValue}
                                        onChange={handleCustomListChange}
                                        autoWidth
                                        label=""
                                    >
                                        {customListTypes.map((type, idx) => (
                                            <MenuItem key={idx} value={type.name}>{type.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            );
                        case 'date-time-picker':
                            return <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="Start Date" value={startDate} onChange={(newValue) => setStartDate(newValue)} renderInput={(params) => <TextField {...params} />} sx={{ maxWidth: 200, marginRight: '10px' }}/>
                                <DatePicker label="End Date" value={endDate} onChange={(newValue) => setEndDate(newValue)} renderInput={(params) => <TextField {...params} />} sx={{ maxWidth: 200, marginRight: '10px' }}/>
                            </LocalizationProvider>;
                        case 'date-time-format-picker':
                            return (
                                <FormControl key={option} sx={{ minWidth: 120 }}>
                                    <InputLabel id={option}></InputLabel>
                                    <Select
                                        labelId={option}
                                        value={datetimeFormatListValue}
                                        onChange={handleDatetimeFormatListChange}
                                        autoWidth
                                        label=""
                                    >
                                        {datetimeFormatListTypes.map((type, idx) => (
                                            <MenuItem key={idx} value={type.value}>{type.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            );
                        case 'time-picker':
                            return <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker label="Start Time" onChange={(newValue) => setStartTime(newValue)} renderInput={(params) => <TextField {...params} />} sx={{ maxWidth: 150, marginRight: '10px' }} />
                                <TimePicker label="End Time" onChange={(newValue) => setEndTime(newValue)} renderInput={(params) => <TextField {...params} />} sx={{ maxWidth: 150, marginRight: '10px' }} />
                            </LocalizationProvider>;
                        case 'time-format-picker':
                            return (
                                <FormControl key={option} sx={{ minWidth: 120 }}>
                                    <InputLabel id={option}></InputLabel>
                                    <Select
                                        labelId={option}
                                        value={timeFormatListValue}
                                        onChange={handleTimeFormatListChange}
                                        autoWidth
                                        label=""
                                    >
                                        {timeFormatListTypes.map((type, idx) => (
                                            <MenuItem key={idx} value={type.value}>{type.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            );
                        case 'exponential-lambda-text':
                            return <TextField key={option} id={option} label="λ Value" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px' }} />;
                        case 'decimals-text':
                            return <TextField key={option} id={option} label="Decimals" inputProps={{ type: 'number', min: 0 }} sx={{ maxWidth: 150, marginRight: '10px' }} defaultValue={0} />;
                        case 'mean-text':
                            return <TextField key={option} id={option} label="Mean" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px' }} />;
                        case 'stddev-text':
                            return <TextField key={option} id={option} label="Std Dev" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px' }} />;
                        case 'time-text':
                            return <TextField key={option} id={option} label="Std Dev" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px' }} />;
                        case 'start-at-text':
                            return <TextField key={option} id={option} label="Start At" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px' }} defaultValue={1} />;
                        case 'step-text':
                            return <TextField key={option} id={option} label="Step" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px' }} defaultValue={1} />;
                        case 'repeat-text':
                            return <TextField key={option} id={option} label="Repeat" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px' }} defaultValue={1} />;
                        case 'restart-at-text':
                            return <TextField key={option} id={option} label="Restart At" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px' }} defaultValue={null} />;
                        case 'at-least-text':
                            return <TextField key={option} id={option} label="At Least" inputProps={{ type: 'number', min: 1 }} sx={{ maxWidth: 150, marginRight: '10px' }} defaultValue={1} />;
                        case 'at-most-text':
                            return <TextField key={option} id={option} label="At Most" inputProps={{ type: 'number', min: 1 }} sx={{ maxWidth: 150, marginRight: '10px' }} defaultValue={10} />;
                        case 'password-options':
                            return (
                                <>
                                    <TextField key={option} id={`${option}-min-length`} label="Min Length" inputProps={{ type: 'number', min: 8 }} sx={{ maxWidth: 120, marginRight: '10px' }} defaultValue={8} />
                                    <TextField key={option} id={`${option}-upper`} label="Min Upper" inputProps={{ type: 'number', min: 1 }} sx={{ maxWidth: 100, marginRight: '10px' }} defaultValue={1} />
                                    <TextField key={option} id={`${option}-lower`} label="Min Lower" inputProps={{ type: 'number', min: 1 }} sx={{ maxWidth: 100, marginRight: '10px' }} defaultValue={1} />
                                    <TextField key={option} id={`${option}-number`} label="Min Numbers" inputProps={{ type: 'number', min: 1 }} sx={{ maxWidth: 125, marginRight: '10px' }} defaultValue={1} />
                                    <TextField key={option} id={`${option}-symbol`} label="Min Symbols" inputProps={{ type: 'number', min: 1 }} sx={{ maxWidth: 120, marginRight: '10px' }} defaultValue={1} />
                                </>
                            );
                        case 'lambda-text':
                            return <TextField key={option} id={option} label="λ Value" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px' }} defaultValue={1} />;
                        case 'stddev-text':
                            return <TextField key={option} id={option} label="Std Dev" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px' }} defaultValue={1} />;
                        case 'mean-text':
                            return <TextField key={option} id={option} label="Mean" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px' }} defaultValue={1} />;
                        default:
                            return null;
                    }
                })}
            </div>
        );
    };

    return (
        <>
            <Header />
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
                <div style={{ minWidth: 300, marginLeft: '10px' }}>Field Name</div>
                <div style={{ minWidth: 220, marginLeft: '10px' }}>Type</div>
                <div style={{ minWidth: 100, width: 100, marginLeft: '10px' }}>Blanks</div>
                <div style={{ minWidth: 650, marginLeft: '10px' }}>Other Options</div>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="rows">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {rows.map((row, index) => (
                                <Draggable key={index} draggableId={index.toString()} index={index}>
                                    {(provided) => (
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                        >
                                            <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                {/* Field Name */}
                                                <TextField
                                                    id={`field-name-${index}`}
                                                    sx={{ minWidth: 300, marginLeft: '10px' }}
                                                    value={row.name}
                                                    onChange={(e) => {
                                                        const newName = e.target.value;
                                                        setRows(prevRows => prevRows.map((r, idx) => idx === index ? { ...r, name: newName } : r));
                                                    }}
                                                    variant="outlined"
                                                />

                                                {/* Dropdown Type Selector */}
                                                <FormControl sx={{ minWidth: 220, marginLeft: '10px' }}>
                                                    <InputLabel id={`select-type-label-${index}`}></InputLabel>
                                                    <Select
                                                        labelId={`select-type-label-${index}`}
                                                        value={row.type}
                                                        onChange={(e) => {
                                                            const newType = e.target.value;
                                                            const newName = newType.toLowerCase().replace(/\s/g, '_') + "_" + index;
                                                            setRows(prevRows => prevRows.map((r, idx) => idx === index ? { ...r, type: newType, name: newName } : r));
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
                                                    sx={{ minWidth: 100, width: 100, marginLeft: '10px' }}
                                                    value={row.blanks}
                                                    onChange={(e) => {
                                                        let newBlanks = e.target.value;
                                                        // Remove leading zeros if the input is not "0"
                                                        if (newBlanks !== '0') {
                                                            newBlanks = newBlanks.replace(/^0+/, '');
                                                        }
                                                        // Convert negative numbers to "0"
                                                        if (newBlanks === '' || newBlanks === '-' || /^\d+$/.test(newBlanks)) {
                                                            if (/^\d*$/.test(newBlanks) && newBlanks >= 0 && newBlanks <= 100) {
                                                                setRows(prevRows => prevRows.map((r, idx) => idx === index ? { ...r, blanks: newBlanks } : r));
                                                            }
                                                        }
                                                    }}
                                                    label=""
                                                    InputProps={{
                                                        type: 'text', // Used text here to allow manipulation before converting to number
                                                        endAdornment: '%',
                                                    }}
                                                    placeholder="0"
                                                />


                                                {/* Other Options */}
                                                <div style={{ minWidth: 650, marginLeft: '10px' }}>
                                                    {renderInputFields(basicInputTypes.find(inputType => inputType.name === row.type))}
                                                </div>

                                                {/* Delete Button */}
                                                {rows.length > 1 && (
                                                    <DeleteOutlinedIcon onClick={() => handleDeleteRow(index)} style={{ cursor: 'pointer' }} />
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {/* Add New Row Button */}
            <Button onClick={handleAddRow} variant="contained" color="primary" style={{ marginRight: '10px' }}>
                ADD
                <AddCircleIcon style={{ marginLeft: 'auto', cursor: 'pointer' }} />
            </Button>

            <Divider style={{ margin: '20px 0' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                {/* Number of Rows Input */}
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
                    Number of Rows:
                    <TextField
                        sx={{ minWidth: 200, marginLeft: '10px' }}
                        onChange={(e) => {
                            const newNumOfRows = e.target.value;
                            setNumberOfRowsInOutput(newNumOfRows);
                        }}
                        label=""
                        variant="outlined"
                        value={numberOfRowsInOutput}
                    />
                </div>

                {/* Generate Data Button with Format Dropdown Picker */}
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
                    Format:
                    <Select
                        value={format}
                        onChange={handleFormatChange}
                        variant="outlined"
                        MenuProps={{ PaperProps: { style: { marginTop: 0 } } }}
                        style={{ marginLeft: '10px', marginRight: '10px' }}
                    >
                        <MenuItem value="CSV">CSV</MenuItem>
                        <MenuItem value="SQL">SQL</MenuItem>
                        <MenuItem value="JSON">JSON</MenuItem>
                    </Select>
                    <Button onClick={handleDownloadCSV} variant="contained" color="primary">
                        Generate
                    </Button>
                </div>
            </div>
        </>
    );
}

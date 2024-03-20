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

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { TypeSpecimen } from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import * as generator from './generator';

export default function App() {
    const [rows, setRows] = React.useState([{ name: 'row_number_0', type: 'Row Number', blanks: '50' }]);
    const [numberOfRowsInOutput, setNumberOfRowsInOutput] = React.useState(1000);
    const [format, setFormat] = React.useState('CSV');
    const [customListValue, setCustomListValue] = React.useState('random');

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [searchQuery, setSearchQuery] = React.useState('');

    const [open, setOpen] = React.useState(false);
    const [datetimeFormatListValue, setDatetimeFormatListValue] = React.useState('DD/MM/YYYY');
    const [timeFormatListValue, setTimeFormatListValue] = React.useState('h:mm A');

    // State hooks for start and end dates
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    // State hooks for start and end time
    const [startTime, setStartTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);

    const handleInputSelectionDialogOpen = (event, index) => {
        setAnchorEl(index);
        setOpen(true);
    };


    const handleTypeSelect = (typeName, index) => {
        console.log("In handletypeselect" ,typeName, index)
        const newName = typeName.toLowerCase().replace(/\s/g, '_') + "_" + index;
        setRows(prevRows => prevRows.map((r, typeCellIndex) => typeCellIndex === index ? { ...r, type: typeName, name: newName } : r));
        handleClose(index);
    };

    const handleClose = (index) => {
        setAnchorEl(null);
        setOpen(false);
    };
        
    // Filter the basicInputTypes array based on the search query
    const filteredTypes = basicInputTypes.filter(type =>
        type.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to handle reset all
    const handleResetAll = () => {
        // Set rows to default
        const defaultRows = [{
            name: 'row_number_0',
            type: 'Row Number',
            blanks: '50'
        }];
        setRows(defaultRows);
    };

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
                    return generator.generateRandomHexColor();
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
                            return <TextField key={option} id={option} label="Min Number" inputProps={{ type: 'number' }} sx={{ marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }} defaultValue={0} />;
                        case 'max-num-text':
                            return <TextField key={option} id={option} label="Max Number" inputProps={{ type: 'number' }} sx={{ marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }} defaultValue={100} />;
                        case 'success-probability-text':
                            return <TextField key={option} id={option} label="Success Probability" inputProps={{ type: 'number' }} sx={{ maxWidth: 200, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }} />;
                        case 'custom-list-dropdown':
                            return (
                                <FormControl key={option} sx={{ minWidth: 120, '& .MuiInputBase-root': {borderRadius: '15px' }}}>
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
                                <DatePicker label="Start Date" value={startDate} onChange={(newValue) => setStartDate(newValue)} renderInput={(params) => <TextField {...params} />} sx={{ maxWidth: 200, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' }} }/>
                                <DatePicker label="End Date" value={endDate} onChange={(newValue) => setEndDate(newValue)} renderInput={(params) => <TextField {...params} />} sx={{ maxWidth: 200, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' }} }/>
                            </LocalizationProvider>;
                        case 'date-time-format-picker':
                            return (
                                <FormControl key={option} sx={{ minWidth: 120, '& .MuiInputBase-root': {borderRadius: '15px' } }}>
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
                                <TimePicker label="Start Time" onChange={(newValue) => setStartTime(newValue)} renderInput={(params) => <TextField {...params} />} sx={{ maxWidth: 150, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' }} } />
                                <TimePicker label="End Time" onChange={(newValue) => setEndTime(newValue)} renderInput={(params) => <TextField {...params} />} sx={{ maxWidth: 150, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' }} } />
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
                            return <TextField key={option} id={option} label="λ Value" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }} />;
                        case 'decimals-text':
                            return <TextField key={option} id={option} label="Decimals" inputProps={{ type: 'number', min: 0 }} sx={{ maxWidth: 150, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }} defaultValue={0} />;
                        case 'mean-text':
                            return <TextField key={option} id={option} label="Mean" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }} defaultValue={1}/>;
                        case 'stddev-text':
                            return <TextField key={option} id={option} label="Std Dev" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }} defaultValue={1}/>;
                        case 'time-text':
                            return <TextField key={option} id={option} label="Std Dev" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }} />;
                        case 'start-at-text':
                            return <TextField key={option} id={option} label="Start At" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' }}} />;
                        case 'step-text':
                            return <TextField key={option} id={option} label="Start At" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' }}} />;
                        case 'repeat-text':
                            return <TextField key={option} id={option} label="Repeat" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' }}} />;
                        case 'restart-at-text':
                            return <TextField key={option} id={option} label="Restart At" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' }}} />;
                        case 'at-least-text':
                            return <TextField key={option} id={option} label="At Least" inputProps={{ type: 'number', min: 1 }} sx={{ maxWidth: 150, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }} defaultValue={1} />;
                        case 'at-most-text':
                            return <TextField key={option} id={option} label="At Most" inputProps={{ type: 'number', min: 1 }} sx={{ maxWidth: 150, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }} defaultValue={10} />;
                        case 'password-options':
                            return (
                                <>
                                    <TextField key={option} id={`${option}-min-length`} label="Min Length" inputProps={{ type: 'number', min: 8 }} sx={{ maxWidth: 120, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }} defaultValue={8} />
                                    <TextField key={option} id={`${option}-upper`} label="Min Upper" inputProps={{ type: 'number', min: 1 }} sx={{ maxWidth: 100, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }} defaultValue={1} />
                                    <TextField key={option} id={`${option}-lower`} label="Min Lower" inputProps={{ type: 'number', min: 1 }} sx={{ maxWidth: 100, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }} defaultValue={1} />
                                    <TextField key={option} id={`${option}-number`} label="Min Numbers" inputProps={{ type: 'number', min: 1 }} sx={{ maxWidth: 125, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }} defaultValue={1} />
                                    <TextField key={option} id={`${option}-symbol`} label="Min Symbols" inputProps={{ type: 'number', min: 1 }} sx={{ maxWidth: 120, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }} defaultValue={1} />
                                </>
                            );
                        case 'lambda-text':
                            return <TextField key={option} id={option} label="λ Value" inputProps={{ type: 'number' }} sx={{ maxWidth: 150, marginRight: '10px', '& .MuiInputBase-root': {borderRadius: '15px' } }}  />;
                        default:
                            return null;
                    }
                })}
            </div>
        );
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '20px', flexGrow: 1, overflowX: 'auto', width: '200vw' }}>
            {/* Header */}
            <Header />

            {/* Reset All button */}
            <div style={{display: 'flex', minWidth: 200, alignItems: 'center', marginBottom: '20px', marginLeft: '800px', marginRight: '20px' }}>
                <Button onClick={handleResetAll} variant="contained" color="primary" style={{ backgroundColor: '#1E90FF', borderRadius: '30px', marginRight: '10px' }}>
                    Reset All
                </Button>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
                <div style={{ minWidth: 300, marginLeft: '60px' }}>Field Name</div>
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
                                
                                                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                    <IconButton color="secondary" aria-label="add an alarm">
                                                        <DragIndicatorIcon style={{ color: '#1E90FF' }}/>
                                                    </IconButton>
                                                </div>
                  

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
                                                    InputProps={{
                                                        style: { borderRadius: '15px' }
                                                    }}
                                                />
                    
                                                <FormControl sx={{ minWidth: 220, marginLeft: '10px' }}>
                                                    <Button
                                                    aria-describedby={`popover-${row.id}`}
                                                    onClick={(event) => handleInputSelectionDialogOpen(event, index)} 
                                                    variant="outlined" 
                                                    sx={{ borderRadius: '15px', border: '1px solid #bfbfbf', width: '220px',height: '55px', display: 'flex', textAlign: 'left', justifyContent: 'flex-start', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: ' hidden',
                                                    color: 'black',backgroundColor: 'transparent', '&:hover': {color: 'black', backgroundColor: 'transparent'}}}
                                                
                                                    >   
                                                        {/* {rows[index].selectedType || 'Select Type'} */}
                                                        {row.type || 'Select Type'} 
      
                                                    </Button>

                                                    <Popover
                                                        id={`type-popover-${row.id}`}
                                                        open={open && anchorEl === index}
                                                        anchorEl={anchorEl === index? anchorEl : null}
                                                        onClose={handleClose}
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'center',
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'center',
                                                        }}
                                                        style={{ minHeight: '700px', minWidth: '600px' }}
                                            
                                                    >
                                                        <div style={{ minHeight: '700px', minWidth: '900px', overflow: 'auto' }}>
                                                            <Typography sx={{paddingTop: '50px', paddingLeft: '50px', paddingRight: '50px', paddingButtom: '50px'}}>
                                                                <div>
                                                                    <Typography variant="h5" gutterBottom sx={{display: 'flex', justifyContent: 'center'}} >Data Type</Typography> 
                                                                    <Typography sx={{ paddingTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                                                        <TextField 
                                                                            label="Search" 
                                                                            variant="outlined" 
                                                                            sx={{ width: '500px', marginBottom: '20px', '& .MuiInputBase-root': {borderRadius: '15px' }}}
                                                                            value={searchQuery}
                                                                            onChange={(e) => setSearchQuery(e.target.value)}
                                                                            
                                                                        />
                                                                    </Typography>
                                                                </div> 

                                                                <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                                                    {filteredTypes.map((type, idx) => (
                                                                        <Button
                                                                            key={idx}
                                                                            onClick={() => handleTypeSelect(type.name, index )}
                                                                            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                                                        
                                                                            <div>{type.name}</div>
                                                                            <div style={{ fontSize: '0.6rem', color: 'gray' }}>{type.description}</div>
                                                                            
                                                                        </Button>
                                                                    
                                                                    ))}
                                                                </div>
                                                            </Typography>  
                                                        </div> 
                                                    </Popover>
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
                                                        style: { borderRadius: '15px'}
                                                    }}
                                                    placeholder="0"
                                                />


                                                {/* Other Options */}
                                                <div style={{ minWidth: 600, marginLeft: '10px'}}>
                                                    {renderInputFields(basicInputTypes.find(inputType => inputType.name === rows[index].type))}
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
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px', marginTop: '20px' }}>
                <Button onClick={handleAddRow} variant="contained" color="primary" style={{ backgroundColor: '#1E90FF', marginRight: '10px' }}>
                    <AddCircleIcon style={{ marginLeft: 'auto', cursor: 'pointer' }} />
                    ADD
                </Button>
            </div>
 
            <div style={{ margin: '20px 20px', height: '2px', width: '95%', backgroundColor: 'rgba(70, 130, 180, 0.5)' }} />

            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '100px' }}>
                {/* Number of Rows Input */}
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '10px', marginRight: '100px' }}>
                    Number of Rows: 
                    <TextField
                        sx={{ minWidth: 200, marginLeft: '5px', '& .MuiInputBase-root': {borderRadius: '15px' }}}
                        onChange={(e) => {
                            const newNumOfRows = e.target.value;
                            setNumberOfRowsInOutput(newNumOfRows);
                        }}
                        label=""
                        variant="outlined"
                        value={numberOfRowsInOutput}
                    />
                </div>

                {/* Format */}
                <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '10px', marginRight: '100px' }}>
                    Format: 
                    <Select 
                        value={format}
                        onChange={handleFormatChange}
                        variant="outlined" 
                        MenuProps={{ PaperProps: { style: { marginTop: 0 } } }} 
                        style={{ marginLeft: '10px', marginRight: '10px', borderRadius: '15px' }}
                    >
                        <MenuItem value="CSV">CSV</MenuItem>
                        <MenuItem value="JSON">JSON</MenuItem>
                        <MenuItem value="SQL">SQL</MenuItem>
                    </Select>
                </div>

                {/* Generate Data Button with Format Dropdown Picker */}
                <div style={{display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
                    <Button onClick={handleDownloadCSV} variant="contained" color="primary" style={{ backgroundColor: '#1E90FF', borderRadius: '30px', marginRight: '10px' }}>
                        Generate
                    </Button>
                </div>
            </div>              
        </div>
    );
}


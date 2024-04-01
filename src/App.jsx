import * as React from 'react';
import { useState, useEffect } from 'react';
import './css/main.css';

import Header from './components/Header';
import ForeignKeyDialog from './components/ForeignKeyDialog';
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
import Button from '@mui/material/Button';

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { CropTwoTone, TypeSpecimen } from '@mui/icons-material';
import IconButton from "@mui/material/IconButton";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import Switch from '@mui/material/Switch';

import * as generator from './generator';

export default function App() {
    const [format, setFormat] = React.useState('CSV');
    const [customListValue, setCustomListValue] = React.useState('random');

    const [anchorEl, setAnchorEl] = useState({ el: null, tableIndex: null, rowIndex: null });

    const [searchQuery, setSearchQuery] = React.useState('');

    const [open, setOpen] = React.useState(false);

    const [tables, setTables] = useState([{id: 0, tableName: 'Table_0', rows:[{id: 0, name: 'row_number_0', type: 'Row Number', blanks: '50', PK: false}], numOfRows: '1000'}]);

    const [relations, setRelations] = useState([
        { tableId: 0, relations: [] },
        { tableId: 1, relations: [] }
    ]);

    const handleRelationsUpdate = (newRelations) => {
        setRelations(newRelations);
    };

    const handleTableNameChange = (event, tableIndex) => {
        const newTableName = event.target.value;
        setTables(prevTables => {
            const updatedTables = [...prevTables];
            updatedTables[tableIndex].tableName = newTableName;
            return updatedTables;
        })
        console.log("TableName changed to:", newTableName);
    };  

    const handleNumOfRowsChange = (event, tableIndex) => {
        const newNumOfRows = event.target.value;
        setTables(prevTables => {
            const updatedTables = [...prevTables];
            updatedTables[tableIndex].numOfRows = newNumOfRows;
            return updatedTables;
        })
        console.log("NumOfRows changed to:", newNumOfRows);
    }; 

    const handleAddTable = () => {
        if (tables.length < 2) {
            console.log('Adding a new table');
            const newTable = {
                id: tables.length,
                tableName: `Table_${tables.length}`,
                rows: [{ id: 0, name: 'row_number_0', type: 'Row Number', blanks: '50', PK: false }],
                numOfRows: '1000'
            };
            setTables(prevTables => [...prevTables, newTable]);
            console.log("All Tables:", tables);
        }
    };

    // useEffect hook to log 'tables' state on update
    useEffect(() => {
        console.log("All Tables:", tables);
    }, [tables]);

    useEffect(() => {
        console.log("Updated Foreign Key Relations:", relations);
    }, [relations]);

    const handleDeleteTable = (tableIndex) => {
        setTables(prevTables => {
            const updatedTables = [...prevTables];
            updatedTables.splice(tableIndex, 1);
            return updatedTables;
        });
    };


    const handleAddRow = (tableIndex) => {
        console.log(tableIndex);
        console.log('Adding a new row');
        const newRow = {
            id: tables[tableIndex].rows.length, 
            name: `row_number_${tables[tableIndex].rows.length}`,
            type: 'Row Number',
            blanks: '50',
            PK: false
        };
        setTables(prevTables => {
            const updatedTables = [...prevTables];
            updatedTables[tableIndex].rows = [...updatedTables[tableIndex].rows, newRow];
            return updatedTables;
        });

        console.log("All Tables:", tables);
    };

    const handleDeleteRow = (tableIndex, rowIndexToDelete) => {
        setTables(prevTables => prevTables.map((table, idx) => {
            if (idx === tableIndex) {
                // This is the table from which we want to delete a row
                const updatedRows = table.rows.filter((_, rowIndex) => rowIndex !== rowIndexToDelete);
                return { ...table, rows: updatedRows };
            }
            return table; // For other tables, return them as they are
        }));
    };

    const handlePKChange = (tableIndex, rowIndex) => (event) => {
        setTables(prevTables => prevTables.map((table, tIdx) => {
            if (tIdx === tableIndex) {
                const updatedRows = table.rows.map((row, rIdx) => {
                    if (rIdx === rowIndex) {
                        const blanksValue = event.target.checked ? "0" : "50";
                        return { ...row, PK: event.target.checked, blanks: blanksValue };
                    }
                    return row; 
                });
                return { ...table, rows: updatedRows }; 
            }
            return table;
        }));
    };
    

    const [datetimeFormatListValue, setDatetimeFormatListValue] = React.useState('DD/MM/YYYY');
    const [timeFormatListValue, setTimeFormatListValue] = React.useState('h:mm A');

    // State hooks for start and end dates
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    // State hooks for start and end time
    const [startTime, setStartTime] = React.useState(null);
    const [endTime, setEndTime] = React.useState(null);

    const handleInputSelectionDialogOpen = (event, tableIndex, index) => {
        console.log("handleInputSelectionDialogOpen called for row", tableIndex, index);
        setAnchorEl({ el: event.currentTarget, tableIndex: tableIndex, rowIndex: index });
        setOpen(true);
    };

    const handleTypeSelect = (typeName, tableIndex, rowIndex) => {
        console.log("In handleTypeSelect", typeName, tableIndex, rowIndex);
        const newName = typeName.toLowerCase().replace(/\s/g, '_') + "_" + rowIndex;
    
        setTables(prevTables => prevTables.map((table, currentTableIndex) => {
            if (currentTableIndex === tableIndex) {
                const updatedRows = table.rows.map((row, currentRowIndex) => {
                    if (currentRowIndex === rowIndex) {
                        return { ...row, type: typeName, name: newName, blanks: '50', PK:false };
                    }
                    return row; 
                });
    
                return { ...table, rows: updatedRows };
            }
            return table;
        }));
    
        handleClose(tableIndex, rowIndex);
    };
    
    const handleClose = () => {
        setOpen(false);
        setAnchorElInfo({ el: null, tableIndex: null, rowIndex: null }); // Reset
    };
    
        
    // Filter the basicInputTypes array based on the search query
    const filteredTypes = basicInputTypes.filter(type =>
        type.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleResetAll = (tableIndex) => {
        const defaultRows = [{
            id: 0, 
            name: 'row_number_0',
            type: 'Row Number',
            blanks: '50'
        }];
    
        setTables(prevTables => prevTables.map((table, idx) => {
            if (idx === tableIndex) {
                return { ...table, rows: defaultRows };
            }
            return table; 
        }));
    };

    const [openFKDialog, setOpenFKDialog] = React.useState(false);

    const handleFKDialogClose = () => {
        setOpenFKDialog(false);
    };

    const handleUpdateFKButtonPressed = () => {
        console.log("FK Button Pressed")
        setOpenFKDialog(true);
    };

    const handleResetAllTable = () => {
        const defaultTables = {
            id: 0, 
            tableName: 'Table_0',
            rows:[{
                id: 0,
                name: 'row_number_0',
                type: 'Row Number',
                blanks: '50'
            }],
            numOfRows: '1000'
        };
        setTables([defaultTables]);
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

    const handleDragEnd = (result, tableIndex) => {
        if (!result.destination) return;
        setTables(prevTables => prevTables.map((table, idx) => {
            if (idx === tableIndex) {
                const items = Array.from(table.rows);
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);
                return { ...table, rows: items.map((item, index) => ({ ...item, id: index })) }; // Example of reassigning IDs
            }
            return table;
        }));

        setRelations(prevRelations => prevRelations.map(relation => {
            console.log("relations updated in main from drag end");

            // Only update relations if they involve the table that had a row reordered
            if (relation.tableId === tableIndex) {
                // Update 'from' for relations originating from the reordered table
                const updatedFromRelations = relation.relations.map(r => ({
                    ...r,
                    from: r.from === result.source.index ? result.destination.index 
                         : r.from === result.destination.index ? result.source.index 
                         : r.from,
                }));
                return { ...relation, relations: updatedFromRelations };
            } else {
                // Update 'to' for relations pointing to a row in the reordered table
                const updatedToRelations = relation.relations.map(r => ({
                    ...r,
                    to: r.to === result.source.index ? result.destination.index 
                        : r.to === result.destination.index ? result.source.index 
                        : r.to,
                }));
                return { ...relation, relations: updatedToRelations };
            }
        }));
    };
    
    // CSV Functions
    const convertRowsToCSV = (table) => {
        let csvContent = "data:text/csv;charset=utf-8,";

        // Extract field names, types, and blanks percentages
        const headers = table.rows.map(row => row.name);
        const types = table.rows.map(row => row.type);
        const blanksPercentages = table.rows.map(row => row.blanks);

        // Append headers
        csvContent += headers.join(',') + '\r\n';
 
        // Generate sequence if needed
        const startAt = parseInt(document.getElementById(`start-at-text`)?.value) || 1;
        const step = parseInt(document.getElementById(`step-text`)?.value) || 1;
        const repeat = parseInt(document.getElementById(`repeat-text`)?.value) || 1;
        const restartAt = parseInt(document.getElementById(`restart-at-text`)?.value);
        let sequence = [];

        if (types.includes("Sequence")) {
            sequence = generator.generateSequence(startAt, step, repeat, restartAt, table.numOfRows);
        }


        // Booleans to decide if hex color and ISBN generation should be unique
        const isHexColorUnique = true;
        const isISBNUnique = true;

        // Set to check uniqueness of color
        const generatedColors = new Set();

        // Set to check uniqueness of ISBN
        const generatedISBN = new Set();
        
        // Repeat types based on numberOfRowsInOutput
        for (let i = 0; i < table.numOfRows; i++) {
            const rowData = types.map((type, index) => {
                // Determine if this column should be blank for the current row
                const blankChance = Math.random() * 100;
                const blankThreshold = blanksPercentages[index];

                // Check if the generated number is less than the blank threshold
                if (blankChance < blankThreshold) {
                    return '';
                }

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
                    let newColor;
                    do {
                        newColor = generator.generateRandomHexColor();
                    } while (isHexColorUnique && generatedColors.has(newColor));
                    
                    generatedColors.add(newColor);
                        return newColor;
                } else if (type === 'ISBN') {
                    let newISBN;
                    do {
                        newISBN = generator.generateRandomISBN();
                    } while (isISBNUnique && generatedISBN.has(newISBN));

                    generatedISBN.add(newISBN);
                    return newISBN;
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
                } else if (type === 'Exponential Distribution') {
                    const lambda = parseFloat(document.getElementById(`lambda-text`).value) || 1;
                    return generator.generateRandomExponentialDistribution(lambda); 
                } else if (type === 'Normal Distribution') {
                    const stddev = parseFloat(document.getElementById(`stddev-text`).value) || 1;
                    const decimals = parseInt(document.getElementById(`decimals-text`).value) || 0;
                    return generator.generateRandomNormalDistribution(stddev, decimals);
                } else if (type === 'Poisson Distribution') {
                    const mean = parseFloat(document.getElementById(`mean-text`).value) || 1;
                    return generator.generateRandomPoissonDistribution(mean);
                } else {
                    // Handle other types as needed
                    return ``;
                }
            });
            csvContent += rowData.join(',') + '\r\n';
        }

        // Encode CSV content
        const encodedUri = encodeURI(csvContent);
        const fixedEncodedURI = encodedUri.replaceAll('#', '%23');

        return fixedEncodedURI;
    };
    

    // Function to handle CSV download
    const handleDownloadCSV = () => {
        tables.forEach((table, index) => {
            setTimeout(() => {
            const csvContent = convertRowsToCSV(table);
            const link = document.createElement("a");
            link.setAttribute("href", csvContent);
            // link.setAttribute("download", "data.csv");
            link.setAttribute("download", table.tableName + '.csv');
            document.body.appendChild(link);
            link.click();
            }, index * 100); 
        })
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
                <Button onClick={handleResetAllTable} variant="contained" color="primary" style={{ backgroundColor: '#1E90FF', borderRadius: '5px', marginRight: '10px' }}>
                    Reset All Tables
                </Button>
                <Button onClick={handleUpdateFKButtonPressed} disabled={tables.length < 2} variant="contained" color="primary" style={{ backgroundColor: '#1E90FF', borderRadius: '5px', marginRight: '10px' }}>
                    Update Foreign Key Constraints
                </Button>
            </div>

            <ForeignKeyDialog 
                open={openFKDialog} 
                onClose={handleFKDialogClose} 
                tables={tables} 
                mainRelation={relations} 
                onRelationsUpdate={handleRelationsUpdate}
            />

            {tables.map((table, tableIndex) => (
            <div key={tableIndex}>
            {/* Input Table Name  and delete table button*/}
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
                <div style={{ minWidth: 50, marginLeft: '10px' }}>Table Name: </div>
                    <TextField
                        id={`Table_${tableIndex}`}
                        sx={{ minWidth: 100, marginLeft: '10px', marginRight: '50px' }}
                        variant="outlined"
                        InputProps={{
                            style: { borderRadius: '15px' }
                        }}
                        value={table.tableName}
                        // onChange={handleTableNameChange} 
                        onChange={(event) => handleTableNameChange(event, tableIndex)} 
                    />

                    {/* <div style={{ minWidth: 50, marginLeft: '10px' }}> {tableName.name} </div> */}
                    {tables.length > 1 && (
                        <Button onClick={()=>handleDeleteTable(tableIndex)} variant="contained" color="primary" style={{ backgroundColor: '#1E90FF', borderRadius: '5px', marginRight: '40px' }}>
                            Delete Table
                        </Button>
                    )}
                    
                    <Button onClick={()=>handleResetAll(tableIndex)} variant="contained" color="primary" style={{ backgroundColor: '#1E90FF', borderRadius: '5px', marginRight: '10px' }}>
                        Reset All Rows
                    </Button>
          
                </div>
            
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '10px' }}>
                <div style={{ minWidth: 300, marginLeft: '60px' }}>Field Name</div>
                <div style={{ minWidth: 220, marginLeft: '10px' }}>Type</div>
                <div style={{ minWidth: 100, width: 100, marginLeft: '10px' }}>Blanks</div>
                <div style={{ minWidth: 600, marginLeft: '10px' }}>Other Options</div>
                <div style={{ minWidth: 0, marginLeft: '100px' }}>Primary Key</div>
            </div>
            
            <DragDropContext onDragEnd={(result) => handleDragEnd(result, tableIndex)}>
                <Droppable droppableId="rows">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {table.rows.map((row, index) => (
                                <Draggable key={row.id} draggableId={index.toString()} index={index}>
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
                                                        setTables(prevTables => prevTables.map((table, tIdx) => {
                                                            if (tIdx === tableIndex) { // Check if this is the table we want to update
                                                                // Now update the specific row within this table
                                                                const updatedRows = table.rows.map((r, rIdx) => {
                                                                    if (rIdx === index) { // Find the specific row by index
                                                                        return { ...r, name: newName }; // Update the name of this row
                                                                    }
                                                                    return r; // Leave other rows unchanged
                                                                });
                                                                return { ...table, rows: updatedRows }; // Return the updated table with modified rows
                                                            }
                                                            return table; // Leave other tables unchanged
                                                        }));
                                                    }}
                                                    variant="outlined"
                                                    InputProps={{
                                                        style: { borderRadius: '15px' }
                                                    }}
                                                />

                                                {/* Popover Panel */}
                                                <FormControl sx={{ minWidth: 220, marginLeft: '10px' }}>
                                                    <Button
                                                    aria-describedby={`popover-${tableIndex}-${index}`} 
                                                    onClick={(event) => handleInputSelectionDialogOpen(event, tableIndex, index)} 
                                                    variant="outlined" 
                                                    sx={{ borderRadius: '15px', border: '1px solid #bfbfbf', width: '220px',height: '55px', display: 'flex', textAlign: 'left', justifyContent: 'flex-start', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: ' hidden',
                                                    color: 'black',backgroundColor: 'transparent', '&:hover': {color: 'black', backgroundColor: 'transparent'}}}
                                                
                                                    >   
                                                        {row.type || 'Select Type'} 
      
                                                    </Button>

                                                    <Popover
                                                        id={`popover-${tableIndex}-${index}`}
                                                        open={open && anchorEl.tableIndex === tableIndex && anchorEl.rowIndex === index}
                                                        anchorEl={anchorEl.el}
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
                                                                            onClick={() => handleTypeSelect(type.name, tableIndex, index )}
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
                                                        // Only allow numbers, empty input, or '-' for the input process, and ensure within range 0-100
                                                        if (newBlanks === '' || newBlanks === '-' || (/^\d+$/.test(newBlanks) && parseInt(newBlanks, 10) >= 0 && parseInt(newBlanks, 10) <= 100)) {
                                                            setTables(prevTables => prevTables.map((table, tIdx) => {
                                                                if (tIdx === tableIndex) {
                                                                    // This is the table we're updating
                                                                    const updatedRows = table.rows.map((r, rIdx) => {
                                                                        if (rIdx === index) {
                                                                            // This is the row we want to update
                                                                            return { ...r, blanks: newBlanks };
                                                                        }
                                                                        return r; // Other rows remain unchanged
                                                                    });
                                                                    return { ...table, rows: updatedRows };
                                                                }
                                                                return table; // Other tables remain unchanged
                                                            }));
                                                        }
                                                    }}
                                                    disabled={['Row Number', 'ISBN', 'Hex Colour'].includes(row.type)  && row.PK == true || row.PK}

                                                    label=""
                                                    InputProps={{
                                                        type: 'text', // Keep as text to handle input manipulation
                                                        endAdornment: '%',
                                                        style: { borderRadius: '15px' }
                                                    }}
                                                    placeholder="0"
                                                />

                                                {/* Other Options */}
                                                <div style={{ minWidth: 650, marginLeft: '10px'}}>
                                                    {renderInputFields(basicInputTypes.find(inputType => inputType.name === tables[tableIndex].rows[index].type))}
                                                </div>

                                                {/* Primary key switch */} 
                                                <div key={row.id} style={{ minWidth: 150, marginLeft: '80px'}}>
                                                {['Row Number', 'ISBN', 'Hex Colour'].includes(row.type) && (             
                                                
                                                    <Switch
                                                        checked={row.PK}
                                                        onChange={handlePKChange(tableIndex, index)}
                                                        
                                                    />
                                                
                                                )}
                                                </div>

                                                {/* Delete Button */}
                                                {tables[tableIndex].rows.length > 1 && (
                                                    <DeleteOutlinedIcon onClick={() => handleDeleteRow(tableIndex, index)} style={{ cursor: 'pointer' }} />
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
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px', marginTop: '20px', marginLeft: '50px' }}>
                <Button onClick={()=>handleAddRow(tableIndex)} variant="contained" color="primary" style={{ backgroundColor: '#1E90FF', marginRight: '10px' }}>
                    <AddCircleIcon style={{ marginLeft: 'auto', cursor: 'pointer' }} />
                    ADD Fields
                </Button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '10px', marginLeft: '50px', marginTop: '20px' }}>
                Number of Rows: 
                <TextField
                    sx={{ minWidth: 200, marginLeft: '5px', '& .MuiInputBase-root': {borderRadius: '15px' }}}
                    value={table.numOfRows}
                    label=""
                    variant="outlined"
                    onChange={(event) => handleNumOfRowsChange(event, tableIndex)}
                />
            </div>

            <div style={{ margin: '20px 20px', height: '2px', width: '95%', backgroundColor: 'rgba(70, 130, 180, 0.5)' }} />

        </div>
        
        ))}

        
        
        {/* Add New Table Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px', marginTop: '20px' }}>
            <Button onClick={handleAddTable} disabled={tables.length >= 2} variant="contained" color="primary" style={{ backgroundColor: '#1E90FF', marginRight: '10px' }}>
                <AddCircleIcon style={{ marginLeft: 'auto', cursor: 'pointer' }} />
                ADD Tables
            </Button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginLeft: '500px' }}>

            {/* Format */}
            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', marginBottom: '10px', marginRight: '50px' }}>
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
                <Button onClick={handleDownloadCSV} variant="contained" color="primary" style={{ backgroundColor: '#1E90FF', borderRadius: '5px', marginRight: '10px' }}>
                    Generate
                </Button>
            </div>
        </div>

        </div>
    );
}


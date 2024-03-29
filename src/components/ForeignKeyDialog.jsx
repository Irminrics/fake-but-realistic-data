import React from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export default function ForeignKeyDialog({ open, onClose, tables }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
        >
            <DialogTitle>{"Update Foreign Key Constraints"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <ul>
                        <li>Drag the arrows from the field names of one table to another to indicate a "FOREIGN KEY REFERENCES" relationship.</li>
                        <li>Eg. A_ID <span className="keyword-highlight">&rarr;</span> B_ID indicates a "A_ID <span className="keyword-highlight">FOREIGN KEY REFERENCES</span> B_ID" relationship.</li>
                        <li>This step is optional.</li>
                    </ul>
                </DialogContentText>
                <Divider/>
                <br/>
                <ArcherContainer>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            {tables.map((table, tableIndex) => (
                                <>
                                    <Grid item xs={6}>
                                        <Box padding={2}>
                                            <div className="table-name">{table.tableName}</div>
                                            {table.rows.map((row, rowIndex) => (
                                                <div className='table-fieldname-cell'>
                                                    <ArcherElement
                                                        key={`${tableIndex}-${rowIndex}`}
                                                        id={`field-table${tableIndex}-${rowIndex}`}
                                                        relations={[]}
                                                    >
                                                        <div>{row.name}</div>
                                                    </ArcherElement>
                                                </div>
                                            ))}
                                        </Box>
                                    </Grid>
                                </>
                            ))}
                        </Grid>
                    </Box>
                </ArcherContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained" color="primary" className='primary-button'>Save & Close</Button>
            </DialogActions>
        </Dialog>
    );
};

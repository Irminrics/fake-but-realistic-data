// ForeignKeyDialog.jsx

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function ForeignKeyDialog({ open, onClose }) {
    return (
        <>
        {/* Dialog Handling Foreign Key Constraints */}
        <Dialog
        open={open}
        onClose={onClose}
        maxWidth="xl"
        >
        <DialogTitle>
        {"Update Foreign Key Constraints"}
        </DialogTitle>
 
        <DialogContent>
            <DialogContentText>
                {/* Instructions */}
                <ul>
                    <li>Drag the arrows from the field names of one table to another to indicate a "FOREIGN KEY REFERENCES" relationship.</li>
                    <li>Eg. A_ID <span className="keyword-highlight">&rarr;</span> B_ID indicates a "A_ID <span className="keyword-highlight">FOREIGN KEY REFERENCES</span> B_ID" relationship.</li>
                    <li>This step is optional.</li>
                </ul>

                {/* Table Rows */}
                
            </DialogContentText>
        </DialogContent>

        <DialogActions>
        <Button onClick={onClose}>Save and Close</Button>
        </DialogActions>
        </Dialog>
    </>
    );
};

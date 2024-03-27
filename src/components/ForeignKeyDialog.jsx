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
        >
        <DialogTitle>
        {"Update Foreign Key Constraints"}
        </DialogTitle>

        <DialogContent>
            <DialogContentText>
                TBU
            </DialogContentText>
        </DialogContent>

        <DialogActions>
        <Button onClick={onClose}>Save and Close</Button>
        </DialogActions>
        </Dialog>
    </>
    );
};

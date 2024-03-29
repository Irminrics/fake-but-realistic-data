import React from 'react';
import { ArcherContainer, ArcherElement } from 'react-archer';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function ForeignKeyDialog({ open, onClose, tables, onRelationsUpdate }) {
    const [relations, setRelations] = React.useState([
        { tableId: 0, relations: [] }, 
        { tableId: 1, relations: [] }
    ]);

    const [dragSource, setDragSource] = React.useState(null);

    const handleDragStart = (event, tableIndex, rowIndex) => {
        setDragSource({ tableIndex, rowIndex });
    };

    const handleResetRelations = () => {
        setRelations([
            { tableId: 0, relations: [] }, 
            { tableId: 1, relations: [] }
        ]);
    };

    const handleSave = () => {
        onRelationsUpdate(relations);
        onClose();
    };

    const handleDrop = (event, tableIndex, rowIndex) => {
        // Restrict to different tables only
        if (dragSource && dragSource.tableIndex !== tableIndex) {
            setRelations((prevRelations) => {
                const newRelations = [...prevRelations];
                const sourceTableRelations = newRelations.find(rel => rel.tableId === dragSource.tableIndex);
                if (sourceTableRelations) {
                    sourceTableRelations.relations = sourceTableRelations.relations.filter(rel => rel.from !== dragSource.rowIndex);
                    sourceTableRelations.relations.push({ from: dragSource.rowIndex, to: rowIndex });
                }
                return newRelations;
            });
            setDragSource(null);
        }
    };

    const getRelationsForElement = (tableIndex, rowIndex) => {
        const tableRelations = relations.find(rel => rel.tableId === tableIndex)?.relations || [];
        return tableRelations
            .filter(rel => rel.from === rowIndex)
            .map(rel => ({
                targetId: `field-table${1-tableIndex}-${rel.to}`,
                sourceAnchor: tableIndex == 0 ? 'right' : 'left',
                targetAnchor: tableIndex == 0 ? 'left' : 'right',
                style: { strokeColor: '#2196f3', strokeWidth: 2 },
            }));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xl">
            <DialogTitle>Update Foreign Key Constraints</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <ul>
                        <li>Drag the arrows from the field names of one table to another to indicate a "FOREIGN KEY REFERENCES" relationship.</li>
                        <li>Eg. A_ID <span className="keyword-highlight">&rarr;</span> B_ID indicates a "A_ID <span className="keyword-highlight">FOREIGN KEY REFERENCES</span> B_ID" relationship.</li>
                        <li>This step is optional.</li>
                    </ul>
                </DialogContentText>
                <Divider />
                <br />
                <ArcherContainer strokeColor="blue">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={10}>
                            {tables.map((table, tableIndex) => (
                                <Grid item xs={6} key={`table-${tableIndex}`}>
                                    <div className='table-header'>{table.tableName}</div>
                                    {table.rows.map((row, rowIndex) => (
                                        <ArcherElement
                                            key={`${tableIndex}-${rowIndex}`}
                                            id={`field-table${tableIndex}-${rowIndex}`}
                                            relations={getRelationsForElement(tableIndex, rowIndex)}
                                        >
                                            <div
                                                className="table-fieldname-cell"
                                                draggable="true"
                                                onDragStart={(e) => handleDragStart(e, tableIndex, rowIndex)}
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={(e) => handleDrop(e, tableIndex, rowIndex)}
                                            >
                                                {row.name}
                                            </div>
                                        </ArcherElement>
                                    ))}
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </ArcherContainer>
            </DialogContent>
            <DialogActions>
                <Button className='primary-button' onClick={handleResetRelations} variant="contained">Reset</Button>
                <Button className='primary-button' onClick={handleSave} variant="contained">Save & Close</Button>
            </DialogActions>
        </Dialog>
    );
};

import { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, TableCell, TableRow } from '@mui/material';

function Record({ user, onEdit, onDelete }) {
    const { name, categories, document_number } = user;

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>{document_number}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>
                    {categories.map(category => (
                        <span key={category.id}>{category.value}</span>
                    ))}
                </TableCell>
                <TableCell align="right">
                    <Button onClick={onEdit}>Ver</Button>
                    <Button onClick={onDelete}>Eliminar</Button>
                </TableCell>
            </TableRow>
        </>
    );
}

Record.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        document_number: PropTypes.number,
        categories: PropTypes.array,
    }),
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
};

export default Record;

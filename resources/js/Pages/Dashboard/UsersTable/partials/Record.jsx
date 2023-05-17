import PropTypes from 'prop-types';

import { Button, TableCell, TableRow } from '@mui/material';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { useContext } from 'react';
import { FilterContext } from '@/Contexts/FilterContext';

function Record({ user, number }) {
    const { id, name, categories, document_number } = user;
    const { onSubmit } = useContext(FilterContext);

    const onDelete = () => {
        axios
            .delete(route('users.destroy', id))
            .then(() => {
                onSubmit();
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>{number}</TableCell>
                <TableCell>{document_number}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>
                    {categories.map(category => (
                        <span key={category.id}>{category.value}</span>
                    ))}
                </TableCell>
                <TableCell align="right">
                    <Link href={route('users.show', id)}>
                        <Button>Ver</Button>
                    </Link>
                    <Button onClick={onDelete}>Eliminar</Button>
                </TableCell>
            </TableRow>
        </>
    );
}

Record.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        document_number: PropTypes.number,
        categories: PropTypes.array,
    }),
    number: PropTypes.number,
};

export default Record;

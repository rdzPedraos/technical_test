import PropTypes from 'prop-types';

import { Button, TableCell, TableRow } from '@mui/material';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { useContext } from 'react';
import { FilterContext } from '@/Contexts/FilterContext';
import { Delete, Edit } from '@mui/icons-material';

function Record({ user, number, showCategories }) {
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
                {showCategories && (
                    <TableCell className="hidden lg:block">
                        <div className="flex gap-2">
                            {categories.map(category => (
                                <div
                                    key={category.id}
                                    className={`p-2  rounded text-white bg-[${category.color}]`}
                                >
                                    {category.value}
                                </div>
                            ))}
                        </div>
                    </TableCell>
                )}
                <TableCell align="right">
                    <Link href={route('users.show', id)}>
                        <Button>
                            <Edit />
                        </Button>
                    </Link>

                    <Button onClick={onDelete}>
                        <Delete />
                    </Button>
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
    showCategories: PropTypes.bool,
};

export default Record;

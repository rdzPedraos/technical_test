import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Paper, Table, TableBody } from '@mui/material';

import Header from './partials/header';
import Record from './partials/Record';
import Filters from './partials/Filters';
import { FilterContext } from '@/Contexts/FilterContext';

function UsersTable({ categories }) {
    const { users } = useContext(FilterContext);

    return (
        <Paper>
            <Filters categories={categories} />
            <Table>
                <Header />
                <TableBody>
                    {users.map((user, id) => (
                        <Record key={user.id} user={user} number={id} />
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

UsersTable.propTypes = {
    categories: PropTypes.array,
};

export default UsersTable;

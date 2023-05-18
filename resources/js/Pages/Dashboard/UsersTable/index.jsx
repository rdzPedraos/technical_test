import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, useMediaQuery } from '@mui/material';

import Header from './partials/header';
import Record from './partials/Record';
import Filters from './partials/Filters';
import { FilterContext } from '@/Contexts/FilterContext';

function UsersTable({ categories }) {
    const { users, pagination } = useContext(FilterContext);
    const isPcScreen = useMediaQuery('(min-width: 1280px)');

    return (
        <>
            <Filters categories={categories} />
            <Table>
                <Header showCategories={isPcScreen} />
                <TableBody>
                    {users.map((user, id) => (
                        <Record
                            showCategories={isPcScreen}
                            key={user.id}
                            user={user}
                            number={id + (pagination.page - 1) * pagination.per_page}
                        />
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

UsersTable.propTypes = {
    categories: PropTypes.array,
};

export default UsersTable;
